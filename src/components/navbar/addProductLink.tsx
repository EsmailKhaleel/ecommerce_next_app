"use client"
import MultiStepForm from '../add-product-form/add-product-form';
import React, { use, useState } from 'react';
import styles from './navbar.module.css';
import { auth } from '@/util/auth';
import { useRouter } from 'next/router';

export default function AddProductLink({ session }: { session: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <button
                onClick={function () {
                    if (session) {
                        setIsModalOpen(true);
                    } else {
                        window.confirm('You must be logged in to add a product');
                    }
                }
                }
                className={`addButton ${styles.link}`}
            >
                + Add New Product
            </button>
            {isModalOpen && <MultiStepForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />}
        </div>
    )
}
