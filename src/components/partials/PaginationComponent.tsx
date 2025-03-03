import React, { MouseEventHandler } from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { useRouter } from 'next/router';

const PaginationComponent = ({
    previous,
    pagenumber,
    next,
    totalpage
}: { previous: MouseEventHandler, pagenumber: string, next: MouseEventHandler, totalpage: string }) => {

    const router = useRouter()

    const goTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, to: string) => {
        e.preventDefault();
        router.replace(
            {
                pathname: router.pathname,
                query: { ...router.query, pagenumber: parseInt(to) },
            },
        );
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={previous}
                    />
                </PaginationItem>
                {
                    (parseInt(pagenumber) != 1) ?
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationLink href='#' onClick={(e) => goTo(e, "1")}>{1}</PaginationLink>
                            </PaginationItem>
                            {
                                (1 + 1 != parseInt(pagenumber)) ?
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>:""
                            }
                        </PaginationContent> : ""
                }
                <PaginationItem>
                    {pagenumber}
                </PaginationItem>
                {
                    (parseInt(totalpage) > 1 && totalpage != pagenumber) ?
                        <PaginationContent>
                            {
                                (parseInt(totalpage) - 1 != parseInt(pagenumber)) ?
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>:""
                            }
                            <PaginationItem>
                                <PaginationLink href='#' onClick={(e) => goTo(e, totalpage)}>{totalpage}</PaginationLink>
                            </PaginationItem>
                        </PaginationContent> : ""
                }
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={next}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent