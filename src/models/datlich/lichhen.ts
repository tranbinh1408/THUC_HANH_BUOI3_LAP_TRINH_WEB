import useInitModel from '@/hooks/useInitModel';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { ETrangThaiLichHen } from '@/services/DatLich/LichHen/constants';

export default () => {
  const [visibleFormDatLich, setVisibleFormDatLich] = useState<boolean>(false);
  const [trangThaiFilter, setTrangThaiFilter] = useState<ETrangThaiLichHen | undefined>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  
  const objInit = useInitModel<any>('lich-hen');

  // Thêm dữ liệu mẫu khi khởi tạo component
  useEffect(() => {
    if (!objInit.data || objInit.data.length === 0) {
      taoLichHenMau();
    }
  }, []);

  // Cập nhật hàm kiểm tra lịch trùng để nhận dữ liệu nhân viên
  const kiemTraLichTrung = async (values: any, nhanVienList: any[]): Promise<boolean> => {
    try {
      if (!values.ngayHen || !values.gioHen || !values.idNhanVien || !values.idDichVu) {
        message.error('Thiếu thông tin để kiểm tra lịch hẹn');
        return false;
      }

      // Tìm thông tin nhân viên từ danh sách đã được truyền vào
      const nhanVien = nhanVienList?.find((nv: any) => nv._id === values.idNhanVien);
      if (!nhanVien) {
        message.error('Không tìm thấy thông tin nhân viên!');
        return false;
      }

      // Kiểm tra xem nhân viên đã có lịch vào thời gian này chưa
      const lichHenHienTai = objInit.data.filter((item: any) => 
        item.ngayHen === values.ngayHen && 
        item.gioHen === values.gioHen && 
        item.idNhanVien === values.idNhanVien &&
        (values._id ? item._id !== values._id : true) // Bỏ qua chính nó khi cập nhật
      );

      if (lichHenHienTai.length > 0) {
        message.error('Nhân viên đã có lịch hẹn vào thời gian này!');
        return false;
      }

      // Kiểm tra số lịch hẹn của nhân viên trong ngày
      const lichHenTrongNgay = objInit.data.filter((item: any) => 
        item.ngayHen === values.ngayHen && 
        item.idNhanVien === values.idNhanVien &&
        (values._id ? item._id !== values._id : true) // Bỏ qua chính nó khi cập nhật
      );

      // Sử dụng soKhachToiDa từ thông tin nhân viên
      if (lichHenTrongNgay.length >= nhanVien.soKhachToiDa) {
        message.error(`Nhân viên ${nhanVien.hoTen} đã đạt số lượng khách tối đa (${nhanVien.soKhachToiDa}) trong ngày!`);
        return false;
      }

      return true;
    } catch (error) {
      console.log('Lỗi kiểm tra lịch trùng:', error);
      return false;
    }
  };

  // Cập nhật trạng thái lịch hẹn
  const capNhatTrangThaiLichHen = async (id: string, trangThai: ETrangThaiLichHen) => {
    try {
      const lichHen = objInit.data.find((item: any) => item._id === id);
      if (!lichHen) {
        message.error('Không tìm thấy lịch hẹn!');
        return false;
      }

      lichHen.trangThai = trangThai;
      objInit.putModel(id, lichHen).then(() => {
        message.success('Cập nhật trạng thái thành công!');
      });
      
      return true;
    } catch (error) {
      console.log('Lỗi cập nhật trạng thái:', error);
      return false;
    }
  };

  // Tạo dữ liệu mẫu nếu chưa có dữ liệu
  const taoLichHenMau = () => {
    const danhSachMau = [
      {
        _id: '1',
        hoTenKhach: 'Nguyễn Văn A',
        soDienThoai: '0901234567',
        email: 'nguyenvana@gmail.com',
        idDichVu: '1',
        dichVu: { _id: '1', tenDichVu: 'Cắt tóc nam', giaTien: 100000 },
        idNhanVien: '1',
        nhanVien: { _id: '1', hoTen: 'Trần Văn Tuấn' },
        ngayHen: '2023-12-01',
        gioHen: '09:00',
        trangThai: ETrangThaiLichHen.XAC_NHAN,
        ghiChu: '',
        createdAt: '2023-11-20T08:00:00.000Z',
        updatedAt: '2023-11-20T08:00:00.000Z'
      },
      {
        _id: '2',
        hoTenKhach: 'Lê Thị B',
        soDienThoai: '0908765432',
        email: 'lethib@gmail.com',
        idDichVu: '2',
        dichVu: { _id: '2', tenDichVu: 'Làm móng', giaTien: 150000 },
        idNhanVien: '2',
        nhanVien: { _id: '2', hoTen: 'Nguyễn Thị Hương' },
        ngayHen: '2023-12-02',
        gioHen: '14:00',
        trangThai: ETrangThaiLichHen.CHO_DUYET,
        ghiChu: 'Khách hàng VIP',
        createdAt: '2023-11-21T09:30:00.000Z',
        updatedAt: '2023-11-21T09:30:00.000Z'
      },
    ];

    // Cập nhật data với dữ liệu mẫu
    objInit.setData(danhSachMau);
  };

  return {
    ...objInit,
    visibleFormDatLich,
    setVisibleFormDatLich,
    trangThaiFilter,
    setTrangThaiFilter,
    selectedDate,
    setSelectedDate,
    viewMode,
    setViewMode,
    kiemTraLichTrung,
    capNhatTrangThaiLichHen,
    taoLichHenMau
  };
}; 