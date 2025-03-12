import React from 'react';
import { Card, Button, Space } from 'antd';
import { PlusOutlined, CalendarOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';

const LichHenPage = () => {
  const intl = useIntl();

  return (
    <Card 
      title="Quản lý lịch hẹn"
      extra={
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>
            Đặt lịch hẹn mới
          </Button>
          <Button icon={<CalendarOutlined />}>
            Xem lịch
          </Button>
        </Space>
      }
    >
      {/* Nội dung trang sẽ được thêm sau */}
      <div>Danh sách lịch hẹn sẽ hiển thị ở đây</div>
    </Card>
  );
};

export default LichHenPage; 