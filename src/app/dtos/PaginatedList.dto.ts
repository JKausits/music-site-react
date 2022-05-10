export class PaginatedListDto<T> {
    items: T[] = [];
    itemCount: number = 0;
    page: number = 0;
    pageSize: number = 0;
}
