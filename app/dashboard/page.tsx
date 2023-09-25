'use client';
import { database } from '@/appwrite';
import { useProductsStore } from '@/store/ProductsStore';
import React, { useEffect } from 'react';

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>here will be visible all your task and messages</p>
    </div>
  );
}

export default DashboardPage;
