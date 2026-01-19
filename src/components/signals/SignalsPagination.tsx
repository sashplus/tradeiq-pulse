import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_SIZE_OPTIONS = [50, 100, 200, 500] as const;
const LOCAL_STORAGE_KEY = "signals-page-size";

interface SignalsPaginationProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  isLoading?: boolean;
}

export function SignalsPagination({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
}: SignalsPaginationProps) {
  const [jumpToPage, setJumpToPage] = useState("");
  const [jumpError, setJumpError] = useState(false);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Generate page numbers with smart ellipsis
  const getPageNumbers = useCallback(() => {
    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];
    const showNeighbors = 1; // How many pages to show around current

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      const leftBound = Math.max(2, currentPage - showNeighbors);
      const rightBound = Math.min(totalPages - 1, currentPage + showNeighbors);

      // Add left ellipsis if needed
      if (leftBound > 2) {
        pages.push("ellipsis-start");
      } else if (leftBound === 2) {
        pages.push(2);
      }

      // Add pages around current
      for (let i = leftBound; i <= rightBound; i++) {
        if (i !== 1 && i !== totalPages && !pages.includes(i)) {
          pages.push(i);
        }
      }

      // Add right ellipsis if needed
      if (rightBound < totalPages - 1) {
        pages.push("ellipsis-end");
      } else if (rightBound === totalPages - 1) {
        if (!pages.includes(totalPages - 1)) pages.push(totalPages - 1);
      }

      // Always show last page
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage, 10);
    if (isNaN(page) || page < 1 || page > totalPages) {
      setJumpError(true);
      setTimeout(() => setJumpError(false), 1500);
      return;
    }
    onPageChange(page);
    setJumpToPage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJumpToPage();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Only handle if focus is in pagination area or body
      if (target.closest("[data-pagination]")) {
        if (e.key === "ArrowLeft" && canGoPrev && !isLoading) {
          e.preventDefault();
          onPageChange(currentPage - 1);
        } else if (e.key === "ArrowRight" && canGoNext && !isLoading) {
          e.preventDefault();
          onPageChange(currentPage + 1);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [currentPage, canGoPrev, canGoNext, isLoading, onPageChange]);

  const pageNumbers = getPageNumbers();

  return (
    <TooltipProvider>
      <div
        data-pagination
        className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2"
      >
        {/* Left zone: Results summary */}
        <div className="text-sm text-muted-foreground order-2 sm:order-1">
          {totalItems > 0 ? (
            <>
              Showing <span className="font-medium text-foreground">{startItem}</span>–
              <span className="font-medium text-foreground">{endItem}</span> of{" "}
              <span className="font-medium text-foreground">{totalItems}</span> results
            </>
          ) : (
            "No results"
          )}
        </div>

        {/* Center zone: Page navigation */}
        <div className="flex items-center gap-1 order-1 sm:order-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(1)}
                disabled={!canGoPrev || isLoading}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>First page</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canGoPrev || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Previous page</TooltipContent>
          </Tooltip>

          {/* Page numbers - hide on mobile */}
          <div className="hidden md:flex items-center gap-1">
            {pageNumbers.map((page, idx) =>
              typeof page === "number" ? (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  className={cn(
                    "h-8 w-8 text-xs font-medium",
                    page === currentPage && "pointer-events-none"
                  )}
                  onClick={() => onPageChange(page)}
                  disabled={isLoading}
                >
                  {page}
                </Button>
              ) : (
                <span
                  key={`${page}-${idx}`}
                  className="px-1 text-muted-foreground"
                >
                  …
                </span>
              )
            )}
          </div>

          {/* Mobile: Show "Page X of Y" */}
          <span className="md:hidden text-sm px-2">
            Page {currentPage} of {totalPages}
          </span>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canGoNext || isLoading}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Next page</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(totalPages)}
                disabled={!canGoNext || isLoading}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Last page</TooltipContent>
          </Tooltip>
        </div>

        {/* Right zone: Page size + Jump to page */}
        <div className="flex items-center gap-3 order-3">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Rows per page
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
              disabled={isLoading}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Jump to page - hide on mobile */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Go to</span>
            <Input
              type="number"
              min={1}
              max={totalPages}
              value={jumpToPage}
              onChange={(e) => {
                setJumpToPage(e.target.value);
                setJumpError(false);
              }}
              onKeyDown={handleKeyDown}
              placeholder="#"
              className={cn(
                "h-8 w-16 text-center",
                jumpError && "border-destructive focus-visible:ring-destructive"
              )}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

// Hook for managing pagination state with localStorage persistence
export function useSignalsPagination(totalItems: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (PAGE_SIZE_OPTIONS.includes(parsed as any)) {
          return parsed;
        }
      }
    }
    return 200; // Default
  });

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Clamp current page if it goes out of bounds
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to page 1 on size change
    localStorage.setItem(LOCAL_STORAGE_KEY, String(size));
  }, []);

  return {
    currentPage,
    pageSize,
    totalPages,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
  };
}

// Utility to paginate an array
export function paginateArray<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
