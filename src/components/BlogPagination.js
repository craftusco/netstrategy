import { Pagination, PaginationItemType } from "@nextui-org/pagination";
import styles from "./assets/blog-pagination.module.css";
import { ChevronIcon } from "./utils/ChevronIcon";

export default function BlogPagination({ totalPages, actualPage }) {
  const renderItem = ({ ref, key, value, isActive, onPrevious, setPage }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <a
          href={
            actualPage + 1 > totalPages
              ? "javascript:void(0)"
              : `/blog?page=${actualPage + 1}`
          }
          className={styles.paginationLink}
          key={key}
        >
          <ChevronIcon className={styles.chevronNext} />
        </a>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <a
          className={styles.paginationLink}
          key={key}
          onClick={onPrevious}
          href={
            actualPage > 1
              ? actualPage == 2
                ? `/blog`
                : `/blog?page=${actualPage - 1}`
              : "javascript:void(0)"
          }
        >
          <ChevronIcon />
        </a>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button className={styles.paginationLink} key={key}>
          ...
        </button>
      );
    }

    return (
      <a
        key={key}
        ref={ref}
        className={`${styles.paginationLink} ${
          isActive ? styles.active : styles.paginationLink
        }`}
        onClick={() => setPage(value)}
        href={value > 1 ? `/blog?page=${value}` : "/blog"}
      >
        {value}
      </a>
    );
  };

  return (
    <Pagination
      disableCursorAnimation
      showControls
      total={totalPages}
      page={actualPage}
      initialPage={1}
      className={styles.paginationContainer}
      radius="full"
      renderItem={renderItem}
      variant="light"
      isCompact={1}
      boundaries={1}
    />
  );
}
