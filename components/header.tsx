"use client"; // This remains for the Header component

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import LogOut from "./auth/logOut";
import { JWTPayload } from "@/utils/types";
import profileImage from "../assets/profile-candidate.png";
import Image from "next/image";
import UseHeaderElements from "@/hooks/use-header-elements";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface Props {
  payload: JWTPayload | null;
}

const Header = ({ payload }: Props) => {
  const { headerElements } = UseHeaderElements();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleLogOut = async () => {
    setLoading(true);
    try {
      await axiosInstance.get("/api/users/logout");
      setLoading(false);
      router.refresh();
      toast.success("You Have Logged Out Successfully!");
    } catch (error: any) {
      setLoading(false);
      Swal.fire({
        title: "Error in Logging",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ position: "fixed", left: 0, top: 0, width: "100%" }}
      >
        <Container>
          <Navbar.Brand href="/">Posts CRUD</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {headerElements.map(({ href, label }) => (
                <Nav.Link
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: href === pathname ? "bold" : "inherit",
                  }}
                >
                  {label}
                </Nav.Link>
              ))}
              <NavDropdown
                title={
                  <Image
                    src={profileImage}
                    alt="User Icon"
                    width={30}
                    height={30}
                  />
                }
                id="basic-nav-dropdown"
              >
                {payload ? (
                  <>
                    <NavDropdown.Item href="/change-password">
                      Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogOut}>
                      LogOut{" "}
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: "65px" }}></div>
    </>
  );
};

export default Header;
