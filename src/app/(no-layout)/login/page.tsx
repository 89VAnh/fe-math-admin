"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  LoginFormPage,
  ProFormText,
} from "@ant-design/pro-components";

export default function LoginPage() {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}>
      <LoginFormPage
        logo='https://cdn-icons-png.flaticon.com/512/4720/4720458.png'
        // backgroundVideoUrl='https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr'
        backgroundImageUrl='https://wallpapers.com/images/featured/mathematics-snya5mv2dogewetc.jpg'
        title='Math'
        subTitle='Đăng nhập quản trị hệ thống'
        submitter={{
          searchConfig: {
            submitText: "Đăng nhập",
          },
        }}
        // onFinish={async () => {
        //   if (loginType === "account") {
        //     handleLogin();
        //   } else {
        //     handleNewPw();
        //   }
        // }}
        // loading={login.isLoading}
      >
        <ProFormText
          name='username'
          fieldProps={{
            size: "large",
            prefix: <UserOutlined className={"prefixIcon"} />,
          }}
          placeholder={"Tên đăng nhập"}
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
          ]}
        />
        <ProFormText.Password
          name='password'
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
            strengthText:
              "Mật khẩu nên bao gồm số, chữ và ký tự đặc biệt, độ dài ít nhất 8 ký tự.",
          }}
          placeholder={"Mật khẩu"}
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
          ]}
        />
      </LoginFormPage>
    </div>
  );
}
