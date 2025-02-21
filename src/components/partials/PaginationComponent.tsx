import React, { MouseEventHandler } from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../ui/pagination';

const PaginationComponent = ({
    previous,
    pagenumber,
    next
}: { previous: MouseEventHandler, pagenumber: string, next: MouseEventHandler }) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={previous}
                    />
                </PaginationItem>
                <PaginationItem>
                    {pagenumber}
                </PaginationItem>
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