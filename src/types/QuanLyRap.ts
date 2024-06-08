export type Rap = {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
};

export type Ve = {
  maGhe: number;
  giaVe: number;
};

export type DanhSachVe = {
  maLichChieu: string;
  danhSachVe: Ve[];
};

export type RootObject = {
  statusCode: number;
  message: string;
  content: InfoRap[];
  dateTime: string;
  messageConstants?: string;
};

export type InfoRap = {
  lstCumRap: LstCumRap[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  mahom: string;
};

export type LstCumRap = {
  danhSachPhim: DanhSachPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
};

export type DanhSachPhim = {
  lstLichChieuTheoPhim: LstLichChieuTheoPhim[];
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  hot: (boolean | null)[];
  dangChieu: (boolean | null)[];
  sapChieu: (boolean | null)[];
};

export type LstLichChieuTheoPhim = {
  maLichChieu: number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
};
