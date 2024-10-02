"use client";

import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Link from "next/link";
import "@fontsource/montez"; // Defaults to weight 400

import { JWTPayload } from "@/utils/types";
import profileImage from "../assets/profile-candidate.png";
import UseHeaderElements from "@/hooks/use-header-elements";
import axiosInstance from "@/utils/axiosInstance";

interface Props {
  payload: JWTPayload | null;
}

const Header = ({ payload }: Props) => {
  const { headerElementsUser, headerElementNotUser } = UseHeaderElements();
  const headerElements = payload ? headerElementsUser : headerElementNotUser;
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false); // State to manage Navbar toggle
  const router = useRouter();

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await axiosInstance.get("/api/users/logout");
      setLoading(false);
      toast.success("You Have Logged Out Successfully!");
      router.push("/");
      router.refresh();
      setExpanded(false); // Close the dropdown after logging out
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

  const handleLinkClick = () => {
    setExpanded(false);
    console.log("clicked");
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        expanded={expanded} // Control expansion
        onToggle={() => setExpanded(!expanded)} // Toggle function
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          zIndex: "999",
        }}
      >
        <Container>
          <Navbar.Brand style={{ margin: "auto" }}>
            <Link
              href="/"
              onClick={handleLinkClick}
              style={{ fontFamily: "Montez, cursive", fontSize: "1.8em" }}
            >
              Posts CRUD
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {headerElements.map(({ href, label }) => (
                <Nav.Item
                  key={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: href === pathname ? "bold" : "inherit",
                    color: "black",
                    marginRight: "8px",
                    marginLeft: "8px",
                  }}
                  className="mt-2 mt-lg-0"
                >
                  <Link
                    href={href}
                    onClick={handleLinkClick}
                    style={{ width: "100%" }}
                  >
                    {label}
                  </Link>
                </Nav.Item>
              ))}
              <NavDropdown
                title={
                  <Image
                    src={profileImage}
                    alt="User Icon"
                    width={25}
                    height={25}
                  />
                }
                id="basic-nav-dropdown"
              >
                {payload ? (
                  <>
                    <NavDropdown.Item>
                      <Link
                        href="/change-password"
                        onClick={handleLinkClick}
                        style={{ width: "100%", display: "block" }}
                      >
                        Change Password
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={handleLogOut}
                      style={{ width: "100%", display: "block" }}
                    >
                      LogOut{" "}
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item>
                      <Link
                        href="/login"
                        onClick={handleLinkClick}
                        style={{ width: "100%", display: "block" }}
                      >
                        Login
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Link
                        href="/signup"
                        onClick={handleLinkClick}
                        style={{ width: "100%", display: "block" }}
                      >
                        SignUp
                      </Link>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: "90px" }}></div>
    </>
  );
};

export default Header;
