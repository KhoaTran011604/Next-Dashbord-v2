export class MetaDataStruct {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;

  constructor(
    totalRecords: number = 0,
    totalPages: number = 0,
    currentPage: number = 1,
    pageSize: number = 10
  ) {
    this.totalRecords = totalRecords;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}

export class BaseResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
  metaData: MetaDataStruct;

  constructor(
    success: boolean = true,
    message: string = '',
    data: T | null = null,
    metaData: MetaDataStruct | null = null
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.metaData = metaData || new MetaDataStruct();
  }
}
