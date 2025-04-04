import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Product } from "@/types/product";
import { api } from "@/apiClient/apiClient";
import { FiX, FiChevronLeft, FiChevronRight, FiSave, FiImage, FiDollarSign, FiPackage } from "react-icons/fi";
import { Toast } from "../Toast/Toast";
import Image from "next/image";

const MultiStepForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });
  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const initialValues: Product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    old_price: 0,
    discount: 0,
    category: "",
    image: "",
    images: [],
  };

  // Function to calculate discount based on prices
  const calculateDiscount = useCallback((price: number, oldPrice: number): number => {
    if (oldPrice <= price || oldPrice === 0) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }, []);

  // Function to update old price based on discount
  const calculateOldPrice = useCallback((price: number, discount: number): number => {
    if (discount <= 0 || discount >= 100) return price;
    return Math.round((price / (1 - discount / 100)) * 100) / 100;
  }, []);

  const handleNextStep = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const handlePrevStep = useCallback(() => {
    setStep((prevStep) => prevStep - 1);
  }, []);

  // const handleImagePreview = useCallback((imageUrl: string) => {
  //   if (imageUrl) {
  //     setPreviewImages((prev) => [...prev, imageUrl]);
  //   }
  // }, []);

  async function addProduct(product: Product) {
    setIsSubmitting(true);
    try {
      const productId = Date.now().toString();
      const newProduct = {
        ...product,
        id: productId,
      };
          console.log("product", newProduct)
      const response = await api.post<Product>("/products", newProduct);
      console.log("Product added successfully:", response);
      setToast({
        show: true,
        message: `Item added to Successfully!`,
        type: 'success'
      });
      onClose();
    } catch (error) {
      console.log("Failed to add product:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFormSubmit = (values: Product, { resetForm }: FormikHelpers<Product>) => {
    if (step < 3) {
      handleNextStep();
    } else {
      addProduct(values);
      resetForm();
    }
  };

  const handleImagesStringChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const imagesString = e.target.value;
    
    // Parse comma-separated URLs into array
    const imagesArray = imagesString
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url !== "");
    
    setFieldValue("images", imagesArray);
  };

  if (!isOpen) return null;

  return (
    <>
          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}
    <div className="modal-overlay" onClick={() => onClose()}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Product - Step {step}/3</h2>
          <button className="close-button" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className="stepper">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            <div className="step-number">1</div>
            <div className="step-label">Basic Info</div>
          </div>
          <div className="step-connector"></div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <div className="step-label">Pricing</div>
          </div>
          <div className="step-connector"></div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <div className="step-label">Images</div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema}
          onSubmit={handleFormSubmit}
        >
          {({ values, setFieldValue, handleChange, isValid }) => (
            <Form className="form-container">
              {step === 1 && (
                <div className="form-step">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <FiPackage className="form-icon" />
                      Product Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="Enter product name"
                    />
                    <ErrorMessage name="name" component="div" className="form-error" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <Field
                      id="category"
                      name="category"
                      as="select"
                      className="form-select"
                    >
                      <option value="">Select a category</option>
                      <option value="digital">Digital</option>
                      <option value="clothes">Clothes</option>
                      <option value="furniture">Furniture</option>
                      <option value="beauty">Beauty</option>
                      <option value="fragrances">Fragrances</option>
                      <option value="groceries">Groceries</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="category" component="div" className="form-error" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <Field
                      id="description"
                      name="description"
                      as="textarea"
                      className="form-textarea"
                      placeholder="Enter product description"
                      rows={5}
                    />
                    <ErrorMessage name="description" component="div" className="form-error" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <div className="form-group">
                    <label htmlFor="price" className="form-label">
                      <FiDollarSign className="form-icon" />
                      Current Price
                    </label>
                    <Field
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      className="form-input"
                      placeholder="0.00"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newPrice = parseFloat(e.target.value);
                        handleChange(e);
                        
                        // If old_price exists, recalculate discount
                        if (values.old_price > 0) {
                          const newDiscount = calculateDiscount(newPrice, values.old_price);
                          setFieldValue("discount", newDiscount);
                        }
                      }}
                    />
                    <ErrorMessage name="price" component="div" className="form-error" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="old_price" className="form-label">
                      Original Price
                    </label>
                    <Field
                      id="old_price"
                      name="old_price"
                      type="number"
                      step="0.01"
                      className="form-input"
                      placeholder="0.00"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newOldPrice = parseFloat(e.target.value);
                        handleChange(e);
                        
                        // Recalculate discount when old price changes
                        if (newOldPrice > 0 && values.price > 0) {
                          const newDiscount = calculateDiscount(values.price, newOldPrice);
                          setFieldValue("discount", newDiscount);
                        }
                      }}
                    />
                    <ErrorMessage name="old_price" component="div" className="form-error" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="discount" className="form-label">
                      Discount Percentage
                    </label>
                    <div className="input-with-suffix">
                      <Field
                        id="discount"
                        name="discount"
                        type="number"
                        min="0"
                        max="100"
                        className="form-input"
                        placeholder="0"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const newDiscount = parseFloat(e.target.value);
                          handleChange(e);
                          
                          // Recalculate old price based on the new discount
                          if (values.price > 0 && newDiscount > 0) {
                            const newOldPrice = calculateOldPrice(values.price, newDiscount);
                            setFieldValue("old_price", newOldPrice);
                          }
                        }}
                      />
                      <span className="input-suffix">%</span>
                    </div>
                    <ErrorMessage name="discount" component="div" className="form-error" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-step">
                  <div className="form-group">
                    <label htmlFor="image" className="form-label">
                      <FiImage className="form-icon" />
                      Main Image URL
                    </label>
                    <div className="image-input-container">
                      <Field
                        id="image"
                        name="image"
                        type="text"
                        className="form-input"
                        placeholder="https://example.com/image.jpg"
                      />
                      <button
                        type="button"
                        className="preview-button"
                        // onClick={() => handleImagePreview(values.image)}
                        disabled={!values.image}
                      >
                        Preview
                      </button>
                    </div>
                    <ErrorMessage name="image" component="div" className="form-error" />
                    
                    {values.image && (
                      <div className="image-preview">
                        <Image src={values.image} alt="Main product" className="preview-image" height={100} width={100} priority />
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="additionalImages" className="form-label">
                      Additional Images (comma-separated URLs)
                    </label>
                    <textarea
                      id="additionalImages"
                      name="additionalImages"
                      className="form-textarea"
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      value={values.images?.join(", ")}
                      onChange={(e) => handleImagesStringChange(e, setFieldValue)}
                      rows={5}
                    />
                    <ErrorMessage name="images" component="div" className="form-error" />
                  </div>

                  {values.images && values.images.length > 0 && (
                    <div className="image-gallery">
                      {values.images.map((img, index) => (
                        <div key={index} className="gallery-item">
                          <Image src={img} alt={`Product ${index + 1}`} className="gallery-image" height={100} width={100} priority />
                          <button
                            type="button"
                            className="remove-image"
                            onClick={() => {
                              const newImages = values.images?.filter((_, i) => i !== index);
                              setFieldValue("images", newImages);
                            }}
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="form-buttons">
                {step > 1 && (
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={handlePrevStep}
                  >
                    <FiChevronLeft /> Back
                  </button>
                )}
                
                <button
                  type="submit"
                  className="viewButton"
                  disabled={isSubmitting || !isValid}
                >
                  {step === 3 ? (
                    <>
                      <FiSave /> Save Product
                    </>
                  ) : (
                    <>
                      Next <FiChevronRight />
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );

};

export default MultiStepForm;

// Validation Schemas
const step1Schema = Yup.object({
  name: Yup.string().required("Product name is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description should be at least 10 characters"),
  category: Yup.string().required("Category is required"),
});

const step2Schema = Yup.object({
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  old_price: Yup.number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .test(
      "is-greater-than-price",
      "Old price should be greater than current price",
      function (value) {
        return !value || value > this.parent.price;
      }
    ),
  discount: Yup.number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .test("is-consistent", "Discount is inconsistent with prices", function (value) {
      const { price, old_price } = this.parent;
      if (!old_price || !value) return true;
      const calculatedDiscount = ((old_price - price) / old_price) * 100;
      return Math.abs(calculatedDiscount - value) < 1; // Allow small rounding differences
    }),
});

const step3Schema = Yup.object({
  image: Yup.string()
    .required("Main image URL is required")
    .url("Must be a valid URL"),
  images: Yup.array()
    .of(Yup.string().url("Must be a valid URL"))
    .min(1, "At least one additional image is required"),
});