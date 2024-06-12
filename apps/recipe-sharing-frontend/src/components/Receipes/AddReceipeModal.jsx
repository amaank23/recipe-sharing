import { Button, Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import CustomButton from "../Button/CustomButton";
import { useToggle } from "../../utils/hooks/useToggle";
import AddIngredientModal from "./AddIngredientModal";
import { IoRemoveCircle } from "react-icons/io5";
import { nanoid } from "@reduxjs/toolkit";
import { errorMessage } from "../../utils/message";
import { addRecipeApi } from "../../redux/api/Recipe";
import { useDispatch } from "react-redux";
const AddPostModal = ({ open, close }) => {
  const dispatch = useDispatch();
  const [openIngredientModal, toggleIngredientModal] = useToggle();
  const [ingredients, setIngredients] = useState([]);
  function addIngredient(values) {
    setIngredients((prev) => {
      return [...prev, { ...values, id: nanoid() }];
    });
  }
  function onFinish(values) {
    if (ingredients.length === 0) {
      errorMessage("Please add some ingredients.");
      return;
    }
    const body = {
      ingredients: ingredients.map((item) => ({
        name: item.ingredientName,
        quantity: item.quantity,
        unit: item.unit,
      })),
      ...values,
    };
    addRecipeApi(dispatch, body, close);
  }
  return (
    <Modal title="Add Recipe" open={open} onCancel={close} footer={null}>
      {openIngredientModal && (
        <AddIngredientModal
          open={openIngredientModal}
          close={toggleIngredientModal}
          addIngredient={addIngredient}
        />
      )}
      <Form onFinish={onFinish}>
        <div className="mb-[1rem] py-4 relative bg-white rounded-xl cursor-pointer">
          <Row gutter={16}>
            <Col xs={24}>
              <label htmlFor="name">Recipe Name</label>
              <Form.Item name={"name"} rules={[{ required: true }]}>
                <Input
                  name={"name"}
                  id="name"
                  placeholder={"Enter Recipe Name"}
                  className="h-[41px] mt-2"
                />
              </Form.Item>
            </Col>
            <Col xs={24} className="mt-5">
              <label htmlFor="description">Recipe Description</label>
              <Form.Item name={"description"} rules={[{ required: true }]}>
                <Input.TextArea
                  name={"description"}
                  placeholder={"Enter Recipe Description"}
                  className="mt-2"
                  rows={3}
                  id="description"
                />
              </Form.Item>
            </Col>
            <Col xs={24} className="mt-5">
              <Button
                className="flex justify-center items-center mt-5 border border-primary text-primary h-[41px] w-full"
                onClick={toggleIngredientModal}
              >
                <span>+ Add Ingredient</span>
              </Button>

              <h4 className="font-bold text-xl mt-5 mb-3">Ingredients</h4>
              <ul className="flex flex-col gap-2">
                {ingredients.map((item) => {
                  return (
                    <li className="list-disc ml-3 relative">
                      <span>{`${item.quantity} ${item.unit} ${item.ingredientName}`}</span>
                      <span className="absolute right-0 top-[50%] translate-y-[-50%]">
                        <IoRemoveCircle
                          color="red"
                          onClick={() => {
                            const newIngredients = ingredients.filter(
                              (ingredient) => ingredient.id !== item.id
                            );
                            setIngredients(newIngredients);
                          }}
                        />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </div>
        <div>
          <CustomButton htmlType="submit">Add Recipe</CustomButton>
        </div>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
