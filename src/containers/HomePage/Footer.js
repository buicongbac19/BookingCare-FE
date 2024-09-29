import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

class Footer extends Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="footer-container">
            <div className="footer-content">
              <div className="content-left">
                <div className="company">
                  Công ty Cổ phần Công nghệ BookingCare
                </div>
                <div className="address">
                  <i className="icon bi bi-geo-alt"></i>
                  Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận
                  Cầu Giấy, Thành phố Hà Nội, Việt Nam
                </div>
                <div className="license">
                  <i className="icon bi bi-shield-check"></i>
                  ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                </div>
                <div className="telephone">
                  <i className="icon bi bi-telephone-plus"></i>
                  <span className="phone-number">024-7301-2468</span>
                  <span> (7h - 18h)</span>
                </div>
                <div className="email">
                  <i className="icon bi bi-envelope"></i>
                  <span className="emil-address">support@bookingcare.vn</span>
                  <span> (7h - 18h)</span>
                </div>
                <div className="other-address">
                  Văn phòng tại TP Hồ Chí Minh
                </div>
                <div className="hcm-address">
                  <i className="icon bi bi-geo-alt"></i>
                  Tòa nhà H3, 384 Hoàng Diệu, Phường 6, Quận 4, TP.HCM
                </div>
                <div className="certification">
                  <div className="certification-logo"></div>
                  <div className="certification-logo"></div>
                </div>
              </div>
              <div className="center-content">
                <div className="logo"></div>
                <div className="child">Tuyển dụng</div>
                <div className="child">Chính sách bảo mật</div>
                <div className="child">Quy chế hoạt động</div>
                <div className="child">Liên hệ hợp tác</div>
                <div className="child">Điều khoản sử dụng</div>
                <div className="child">Câu hỏi thường gặp</div>
              </div>
              <div className="right-content">
                <div className="partner">Đối tác bảo trợ nội dung</div>
                <div className="child-partner">
                  <div className="partner-logo hello-doctor"></div>
                  <div className="partner-info">
                    <div className="partner-name">Hello Doctor</div>
                    <div className="partner-desc">
                      Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"
                    </div>
                  </div>
                </div>
                <div className="child-partner">
                  <div className="partner-logo bernard"></div>
                  <div className="partner-info">
                    <div className="partner-name">
                      Hệ thống y khoa chuyên sâu quốc tế Bernard
                    </div>
                    <div className="partner-desc">
                      Bảo trợ chuyên mục nội dung "y khoa chuyên sâu"
                    </div>
                  </div>
                </div>
                <div className="child-partner">
                  <div className="partner-logo doctor-check"></div>
                  <div className="partner-info">
                    <div className="partner-name">
                      Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn
                    </div>
                    <div className="partner-desc">
                      Bảo trợ chuyên mục nội dung "sức khỏe tổng quát"
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="download">
              <div className="download-method">
                <i className="icon bi bi-phone"></i>
                Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:
                <span className="platform"> Android </span>-
                <span className="platform"> iPhone/iPad </span>-
                <span className="platform"> Khác </span>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="copyright-container">
            <div className="copyright-content">© 2024 BookingCare.</div>
            <div className="social-networking">
              <div className="child tiktok"></div>
              <div className="child facebook"></div>
              <div className="child youtube"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
