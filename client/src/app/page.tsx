"use client";

import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <Footer />
    </div>
  );
};

export default page;
