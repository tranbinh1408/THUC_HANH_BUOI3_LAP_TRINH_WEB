declare module DichVu {
  export interface IRecord {
    _id: string;
    maDichVu: string;
    tenDichVu: string;
    moTa?: string;
    giaTien: number;
    thoiGianThucHien: number; // số phút cần để thực hiện dịch vụ
    trangThai: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
} 