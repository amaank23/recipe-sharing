import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useState } from "react";
import CustomButton from "../Button/CustomButton";
import { useForm } from "antd/es/form/Form";

const measurementUnits = {
  volume: [
    { name: "Teaspoon", abbreviation: "tsp" },
    { name: "Tablespoon", abbreviation: "tbsp" },
    { name: "Cup", abbreviation: "c" },
    { name: "Fluid Ounce", abbreviation: "fl oz" },
    { name: "Milliliter", abbreviation: "mL" },
    { name: "Liter", abbreviation: "L" },
    { name: "Pint", abbreviation: "pt" },
    { name: "Quart", abbreviation: "qt" },
    { name: "Gallon", abbreviation: "gal" },
  ],
  weight: [
    { name: "Gram", abbreviation: "g" },
    { name: "Kilogram", abbreviation: "kg" },
    { name: "Milligram", abbreviation: "mg" },
    { name: "Ounce", abbreviation: "oz" },
    { name: "Pound", abbreviation: "lb" },
  ],
  count: [
    { name: "Piece", abbreviation: "piece" },
    { name: "Bunch", abbreviation: "bunch" },
    { name: "Clove", abbreviation: "clove" },
    { name: "Slice", abbreviation: "slice" },
    { name: "Can", abbreviation: "can" },
  ],
};

const AddIngredientModal = ({ open, close, addIngredient }) => {
  const [form] = useForm();
  const measurementType = Form.useWatch("measurementType", form);
  function onFinish(values) {
    addIngredient(values);
    close();
  }
  return (
    <Modal title="Add Ingredient" open={open} onCancel={close} footer={null}>
      <Form form={form} onFinish={onFinish}>
        <div className="mb-[1rem] py-4 relative bg-white rounded-xl cursor-pointer">
          <Row gutter={16}>
            <Col xs={24}>
              <label htmlFor="ingredientName">Ingredient Name</label>
              <Form.Item rules={[{ required: true }]} name={"ingredientName"}>
                <Input
                  id="ingredientName"
                  placeholder={"Enter Ingredient Name"}
                  className="h-[41px] mt-2"
                />
              </Form.Item>
            </Col>
            <Col xs={24} className="mt-5">
              <label htmlFor="quantity">Quantity</label>
              <Form.Item rules={[{ required: true }]} name={"quantity"}>
                <Input
                  id="quantity"
                  type="number"
                  className="h-[41px] mt-2"
                  placeholder="Enter Quantity"
                />
              </Form.Item>
            </Col>
            <Col xs={12} className="mt-5">
              <label htmlFor="measurementType">Measurement Type</label>
              <Form.Item rules={[{ required: true }]} name={"measurementType"}>
                <Select
                  className="h-[41px] mt-2"
                  options={Object.keys(measurementUnits).map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  onChange={() => {
                    form.setFieldValue("unit", null);
                  }}
                  id="measurementType"
                />
              </Form.Item>
            </Col>
            {measurementType && (
              <Col xs={12} className="mt-5">
                <label htmlFor="unit">Unit</label>
                <Form.Item rules={[{ required: true }]} name={"unit"}>
                  <Select
                    className="h-[41px] mt-2"
                    options={measurementUnits[measurementType].map((item) => ({
                      label: item.name,
                      value: item.name,
                    }))}
                    id="unit"
                  />
                </Form.Item>
              </Col>
            )}
          </Row>
        </div>
        <div>
          <CustomButton htmlType="submit">Add Ingredient</CustomButton>
        </div>
      </Form>
    </Modal>
  );
};

export default AddIngredientModal;
