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
      dataIndex: 'dichVu',
      key: 'dichVu',
      render: (dichVu: any) => dichVu?.tenDichVu || 'N/A',
    },
    {
      title: 'Nhân viên',
      dataIndex: 'nhanVien',
      key: 'nhanVien',
      render: (nhanVien: any) => nhanVien?.hoTen || 'N/A',
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