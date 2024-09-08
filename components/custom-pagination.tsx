'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount }: { pageCount: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = async (data: any) => {
    const params = new URLSearchParams(searchParams);

    let currentPage = (data.selected + 1).toString();

    console.log(currentPage);

    if (currentPage) {
      params.set('page', currentPage);
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'..'}
      pageCount={pageCount}
      marginPagesDisplayed={3}
      pageRangeDisplayed={1}
      onPageChange={handleClick}
      containerClassName="flex justify-between w-full md:w-6/12 lg:w-5/12 mx-auto my-8 text-white dark:text-black"
      pageClassName="pag-btn"
      previousClassName="pag-btn"
      nextClassName="pag-btn"
      breakClassName="pag-btn"
      activeClassName="text-[#fc045c] font-extrabold"
    />
  );
};

export default Pagination;