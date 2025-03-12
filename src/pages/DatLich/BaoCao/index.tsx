import React from 'react';
import { Card, Radio } from 'antd';

const BaoCaoPage = () => {
  return (
    <Card 
      title="Báo cáo thống kê"
      extra={
        <Radio.Group defaultValue="ngay">
          <Radio.Button value="ngay">Theo ngày</Radio.Button>
          <Radio.Button value="tuan">Theo tuần</Radio.Button>
          <Radio.Button value="thang">Theo tháng</Radio.Button>
        </Radio.Group>
      }
    >
      {/* Nội dung trang sẽ được thêm sau */}
      <div>Báo cáo thống kê sẽ hiển thị ở đây</div>
    </Card>
  );
};

export default BaoCaoPage; 