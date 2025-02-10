import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">

      {/* Main Content */}
      <div className="mt-5 text-center">
        <h1 className="display-4">Selamat Datang di Halaman Admin</h1>
        <p className="lead">Gunakan menu di atas untuk mengelola Buku, Pelanggan, dan Peminjaman.</p>
        <div className="row justify-content-center mt-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Buku</h5>
                <p className="card-text">Kelola daftar buku yang tersedia di perpustakaan.</p>
                <Link to="/books" className="btn btn-primary">Lihat Buku</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Pelanggan</h5>
                <p className="card-text">Kelola data pelanggan yang terdaftar.</p>
                <Link to="/customers" className="btn btn-primary">Lihat Pelanggan</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Peminjaman</h5>
                <p className="card-text">Kelola data peminjaman buku oleh pelanggan.</p>
                <Link to="/borrowings" className="btn btn-primary">Lihat Peminjaman</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;