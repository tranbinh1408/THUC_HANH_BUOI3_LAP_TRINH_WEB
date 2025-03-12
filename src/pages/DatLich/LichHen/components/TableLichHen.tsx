import React from 'react';
import { Table, Space, Button, Tag, Tooltip, Popconfirm, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
import { ETrangThaiLichHen, trangThaiLichHenText, trangThaiLichHenColor } from '@/services/DatLich/LichHen/constants';

// Định nghĩa interface cho dữ liệu lịch hẹn
interface ILichHenRecord {
  _id: string;
  hoTenKhach: string;
  soDienThoai: string;
  email?: string;
  idDichVu: string;
  dichVu?: { _id: string; tenDichVu: string; giaTien: number };
  idNhanVien: string;
  nhanVien?: { _id: string; hoTen: string };
  ngayHen: string;
  gioHen: string;
  trangThai: ETrangThaiLichHen;
  ghiChu?: string;
  createdAt: string;
  updatedAt: string;
}

interface TableLichHenProps {
  onEdit: (record: ILichHenRecord) => void;
}

const TableLichHen: React.FC<TableLichHenProps> = ({ onEdit }) => {
  const { data, loading, deleteModel, getModels, capNhatTrangThaiLichHen, trangThaiFilter } = useModel('datlich.lichhen');

  // Lấy thông tin dịch vụ dựa vào ID
  const getDichVuInfo = (idDichVu: string) => {
    const dichVuList = [
      { _id: '1', tenDichVu: 'Cắt tóc nam', giaTien: 100000 },
      { _id: '2', tenDichVu: 'Làm móng', giaTien: 150000 },
      { _id: '3', tenDichVu: 'Massage', giaTien: 300000 },
      { _id: '4', tenDichVu: 'Làm tóc', giaTien: 250000 },
    ];
    
    return dichVuList.find(item => item._id === idDichVu)?.tenDichVu || 'N/A';
  };

  // Lấy thông tin nhân viên dựa vào ID
  const getNhanVienInfo = (idNhanVien: string) => {
    const nhanVienList = [
      { _id: '1', hoTen: 'Trần Văn Tuấn', chuyenMon: ['1', '3'] },
      { _id: '2', hoTen: 'Nguyễn Thị Hương', chuyenMon: ['2', '4'] },
      { _id: '3', hoTen: 'Lê Minh Quân', chuyenMon: ['1', '4'] },
      { _id: '4', hoTen: 'Phạm Thị Lan', chuyenMon: ['2', '3'] },
    ];
    
    return nhanVienList.find(item => item._id === idNhanVien)?.hoTen || 'N/A';
  };

  // Xác nhận lịch hẹn
  const handleXacNhan = async (record: ILichHenRecord) => {
    await capNhatTrangThaiLichHen(record._id, ETrangThaiLichHen.XAC_NHAN);
  };

  // Hủy lịch hẹn
  const handleHuy = async (record: ILichHenRecord) => {
    await capNhatTrangThaiLichHen(record._id, ETrangThaiLichHen.HUY);
  };

  // Hoàn thành lịch hẹn
  const handleHoanThanh = async (record: ILichHenRecord) => {
    await capNhatTrangThaiLichHen(record._id, ETrangThaiLichHen.HOAN_THANH);
  };

  // Xóa lịch hẹn
  const handleDelete = async (id: string) => {
    await deleteModel(id);
  };

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'hoTenKhach',
      key: 'hoTenKhach',
      render: (text: string, record: ILichHenRecord) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>{record.soDienThoai}</div>
        </div>
      ),
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'idDichVu',
      key: 'dichVu',
      render: (idDichVu: string, record: ILichHenRecord) => {
        // Ưu tiên sử dụng thông tin dichVu nếu có, nếu không thì lấy từ idDichVu
        return record.dichVu?.tenDichVu || getDichVuInfo(idDichVu);
      },
    },
    {
      title: 'Nhân viên',
      dataIndex: 'idNhanVien',
      key: 'nhanVien',
      render: (idNhanVien: string, record: ILichHenRecord) => {
        // Ưu tiên sử dụng thông tin nhanVien nếu có, nếu không thì lấy từ idNhanVien
        return record.nhanVien?.hoTen || getNhanVienInfo(idNhanVien);
      },
    },
    {
      title: 'Thời gian',
      key: 'thoiGian',
      render: (_: any, record: ILichHenRecord) => (
        <div>
          <div>{moment(record.ngayHen).format('DD/MM/YYYY')}</div>
          <div>{record.gioHen}</div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai: ETrangThaiLichHen) => (
        <Tag color={trangThaiLichHenColor[trangThai]}>
          {trangThaiLichHenText[trangThai]}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: ILichHenRecord) => (
        <Space>
          <Tooltip title="Sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          
          {record.trangThai === ETrangThaiLichHen.CHO_DUYET && (
            <Tooltip title="Xác nhận">
              <Button
                type="text"
                icon={<CheckOutlined style={{ color: 'green' }} />}
                onClick={() => handleXacNhan(record)}
              />
            </Tooltip>
          )}
          
          {record.trangThai !== ETrangThaiLichHen.HOAN_THANH && record.trangThai !== ETrangThaiLichHen.HUY && (
            <>
              {record.trangThai === ETrangThaiLichHen.XAC_NHAN && (
                <Tooltip title="Hoàn thành">
                  <Button
                    type="text"
                    icon={<CheckOutlined style={{ color: 'blue' }} />}
                    onClick={() => handleHoanThanh(record)}
                  />
                </Tooltip>
              )}
              
              <Tooltip title="Hủy">
                <Button
                  type="text"
                  icon={<CloseOutlined style={{ color: 'red' }} />}
                  onClick={() => handleHuy(record)}
                />
              </Tooltip>
            </>
          )}
          
          <Popconfirm
            title="Bạn có chắc muốn xóa lịch hẹn này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Lọc dữ liệu theo trạng thái nếu có
  const filteredData = trangThaiFilter 
    ? data.filter((item: ILichHenRecord) => item.trangThai === trangThaiFilter)
    : data;

  return (
    <Table 
      columns={columns} 
      dataSource={filteredData} 
      loading={loading}
      rowKey="_id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default TableLichHen; 