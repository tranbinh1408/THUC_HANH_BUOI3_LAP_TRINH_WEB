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
  onEdit: (record: any) => void;
}

const TableLichHen: React.FC<TableLichHenProps> = ({ onEdit }) => {
  const { data, loading, deleteModel, getModels, capNhatTrangThaiLichHen, trangThaiFilter } = useModel('datlich.lichhen');
  const { data: nhanVienData } = useModel('datlich.nhanvien');
  const { data: dichVuData } = useModel('datlich.dichvu');

  // Lấy thông tin dịch vụ dựa vào ID
  const getDichVuInfo = (idDichVu: string) => {
    const dichVu = dichVuData?.find((item: any) => item._id === idDichVu);
    return dichVu?.tenDichVu || 'N/A';
  };

  // Lấy thông tin nhân viên dựa vào ID
  const getNhanVienInfo = (idNhanVien: string) => {
    const nhanVien = nhanVienData?.find((item: any) => item._id === idNhanVien);
    return nhanVien?.hoTen || 'N/A';
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
      )
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'idDichVu',
      key: 'idDichVu',
      render: (idDichVu: string) => getDichVuInfo(idDichVu)
    },
    {
      title: 'Nhân viên',
      dataIndex: 'idNhanVien',
      key: 'idNhanVien',
      render: (idNhanVien: string) => getNhanVienInfo(idNhanVien)
    },
    {
      title: 'Thời gian',
      key: 'thoiGian',
      render: (_, record: ILichHenRecord) => (
        <div>
          <div>{moment(record.ngayHen).format('DD/MM/YYYY')}</div>
          <div>{record.gioHen}</div>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai: ETrangThaiLichHen) => (
        <Tag color={trangThaiLichHenColor[trangThai]}>
          {trangThaiLichHenText[trangThai]}
        </Tag>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record: ILichHenRecord) => (
        <Space size="small">
          {record.trangThai === ETrangThaiLichHen.CHO_DUYET && (
            <>
              <Tooltip title="Xác nhận">
                <Button
                  type="primary"
                  size="small"
                  icon={<CheckOutlined />}
                  onClick={() => handleXacNhan(record)}
                />
              </Tooltip>
              <Tooltip title="Hủy">
                <Button
                  danger
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={() => handleHuy(record)}
                />
              </Tooltip>
            </>
          )}
          {record.trangThai === ETrangThaiLichHen.XAC_NHAN && (
            <Tooltip title="Hoàn thành">
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleHoanThanh(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="Sửa">
            <Button
              type="default"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa lịch hẹn này?"
              onConfirm={() => handleDelete(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <Button danger size="small" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  const filteredData = trangThaiFilter
    ? data.filter((item: any) => item.trangThai === trangThaiFilter)
    : data;

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      rowKey="_id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default TableLichHen; 