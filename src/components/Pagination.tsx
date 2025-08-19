/**
 * Pagination component with URL handling
 * Supports prev/next navigation and page numbers
 */

'use client';

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from './ui/Button';
import type { PaginationInfo } from '@velvele/lib/blog/posts';
import { useCallback } from 'react';

interface PaginationProps {
  pagination: PaginationInfo;
  className?: string;
  baseUrl?: string;
}

export function Pagination({
  pagination,
  className = '',
  baseUrl = '',
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }
      const queryString = params.toString();
      return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
    },
    [searchParams, baseUrl]
  );

  const navigateToPage = useCallback(
    (page: number) => {
      const url = createPageUrl(page);
      router.push(url);
    },
    [router, createPageUrl]
  );

  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
  } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  // Generate page numbers to show
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisible) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisible - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      className={`flex items-center justify-center space-x-2 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => prevPage && navigateToPage(prevPage)}
        disabled={!hasPrevPage}
        className="flex items-center space-x-1"
      >
        <CaretLeftIcon className="h-4 w-4" weight="regular" />
        <span>Önceki</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              variant={isCurrentPage ? 'primary' : 'outline'}
              size="sm"
              onClick={() => navigateToPage(pageNum)}
              className="min-w-[40px]"
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => nextPage && navigateToPage(nextPage)}
        disabled={!hasNextPage}
        className="flex items-center space-x-1"
      >
        <span>Sonraki</span>
        <CaretRightIcon className="h-4 w-4" weight="regular" />
      </Button>
    </nav>
  );
}

// Simplified pagination for basic use cases
export function SimplePagination({
  hasNextPage,
  hasPreviousPage,
  onNext,
  onPrevious,
  className,
}: {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNext: () => void;
  onPrevious: () => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className || ''}`}>
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!hasPreviousPage}
        className="flex items-center space-x-2"
      >
        <CaretLeftIcon className="h-4 w-4" weight="regular" />
        <span>Previous</span>
      </Button>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={!hasNextPage}
        className="flex items-center space-x-2"
      >
        <span>Next</span>
        <CaretRightIcon className="h-4 w-4" weight="regular" />
      </Button>
    </div>
  );
}
