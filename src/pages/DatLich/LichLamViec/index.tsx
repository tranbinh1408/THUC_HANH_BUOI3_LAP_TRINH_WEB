import React from 'react';
import { Card, Button } from 'antd';
import { PlusOutlined, CalendarOutlined } from '@ant-design/icons';

const LichLamViecPage = () => {
  return (
    <Card 
      title="Lịch làm việc nhân viên"
      extra={
        <Button type="primary" icon={<CalendarOutlined />}>
          Thiết lập lịch làm việc
        </Button>
      }
    >
      {/* Nội dung trang sẽ được thêm sau */}
      <div>Lịch làm việc của nhân viên sẽ hiển thị ở đây</div>
    </Card>
  );
};

export default LichLamViecPage; 