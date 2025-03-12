declare module LichHen {
	export enum ETrangThaiLichHen {
		CHO_DUYET = 'CHO_DUYET',
		XAC_NHAN = 'XAC_NHAN',
		HOAN_THANH = 'HOAN_THANH',
		HUY = 'HUY',
	}

	export interface IRecord {
		_id: string;
		hoTenKhach: string;
		soDienThoai: string;
		email?: string;
		idDichVu: string;
		dichVu?: DichVu.IRecord;
		idNhanVien: string;
		nhanVien?: NhanVien.IRecord;
		ngayHen: string; // ISO date string
		gioHen: string; // format: HH:mm
		trangThai: ETrangThaiLichHen;
		ghiChu?: string;
		createdAt?: string;
		updatedAt?: string;
		//Giang
		feedback?: string;
		rateScore?: number;
	}
}
