import React, { Fragment, useContext, useEffect } from "react";
import ChatAppContext from "../../../_helper/chat-app/index";
import { H6, Image, LI, Spinner, UL } from "../../../AbstractElements";
import errorImg from "../../../assets/images/search-not-found.png";
import SearchChatList from "./SearchChatList";
import { Media } from "reactstrap";
import UserProfile from "../../../assets/images/user/userProfile.png";
import appStore from "../Client/AppStore";
import { customStyles, getLocaleTimeFormat } from "../../Chats Panel/ChatApp/ChatStatus";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";

const sampleMsgs = [
  {
      "_id": "65ec293293003c673534f923",
      "userId": "659e887591e16ca5f243af7a",
      "botId": "659e88d191e16ca5f243af99",
      "phoneNumber": "87bda71a-086f-4c78-bc4d-fdac592249fa",
      "chatSessionId": "87bda71a-086f-4c78-bc4d-fdac592249fa",
      "chat": [
          {
              "time": "2024-03-09T09:17:38.919Z",
              "message": "{\"message\":\"Hi\"}",
              "from": "USER",
              "_id": "65ec293293003c673534f924"
          },
          {
              "time": "2024-03-09T09:17:45.886Z",
              "message": "{\"message\":\"Hello! How can I assist you with your order?\",\"wantAgent\":false,\"possibleUserResponses\":[\"Yes, I need help with my order.\",\"No, I don't need help with my order.\",\"Can you tell me the status of my order?\"]}",
              "from": "BOT",
              "_id": "65ec293993003c673534f92c"
          },
          {
              "time": "2024-03-09T09:17:58.114Z",
              "message": "{\"message\":\"I want to talk with agent\"}",
              "from": "USER",
              "_id": "65ec294693003c673534f932"
          }
      ],
      "createdAt": "2024-03-09T09:17:38.945Z",
      "updatedAt": "2024-03-09T09:18:05.232Z",
      "__v": 0,
      "customer": null
  },
  {
      "_id": "65ec228e93003c673534f8ea",
      "userId": "659e887591e16ca5f243af7a",
      "botId": "659e88d191e16ca5f243af99",
      "phoneNumber": "a5de812b-44b4-4340-9e95-638caefec3b5",
      "chatSessionId": "a5de812b-44b4-4340-9e95-638caefec3b5",
      "chat": [
          {
              "time": "2024-03-09T08:49:18.613Z",
              "message": "{\"message\":\"hello\"}",
              "from": "USER",
              "_id": "65ec228e93003c673534f8eb"
          },
          {
              "time": "2024-03-09T08:49:26.322Z",
              "message": "{\"message\":\"Hello! How can I assist you today?\",\"wantAgent\":false,\"possibleUserResponses\":[\"Yes, I need help with finding a product.\",\"No, I'm just browsing for now.\",\"I have a question about a specific product.\"]}",
              "from": "BOT",
              "_id": "65ec229693003c673534f8f3"
          },
          {
              "time": "2024-03-09T08:49:38.964Z",
              "message": "{\"message\":\"show me some products\"}",
              "from": "USER",
              "_id": "65ec22a293003c673534f8f9"
          },
          {
              "time": "2024-03-09T08:49:49.765Z",
              "message": "{\"message\":\"Sure, here are some products that match your query.\",\"wantAgent\":false,\"productList\":[{\"_id\":\"659fbf9e720041ddd3b26eb6\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229417091317\",\"productName\":\"Leafy Straw Cocktail Straw\",\"productDescription\":\"Organic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"1925.00\",\"varient\":[{\"varientName\":\"Export quality Length - 140 mm Diameter - 5 mm\",\"varientId\":44316235956469,\"varientPrice\":\"1925.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Domestic quality Length - 140 mm Diameter - 5 mm\",\"varientId\":44316235989237,\"varientPrice\":\"1650.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/coconut-leaf-straw-7-600x400.jpg?v=1701685624\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.445Z\",\"updatedAt\":\"2024-02-07T06:07:15.077Z\",\"summarizedProductDescription\":\"\\n\\nThese straws are made from fallen coconut palm leaves, are organic and biodegradable, have no external coating, and can stay intact in liquid for hours. They have a 1 year shelf life and are made by women in rural India, resulting in a unique and natural appearance.\"},{\"_id\":\"659fbf9e720041ddd3b26eb7\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229407031541\",\"productName\":\"Leafy Straw Juice Straw\",\"productDescription\":\"Organic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"2200.00\",\"varient\":[{\"varientName\":\"Juice Straw Export quality - \\\"Length - 210 mm Diameter - 4 mm\\\"\",\"varientId\":44316144238837,\"varientPrice\":\"2200.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Juice Straw  Domestic quality - \\\"Length - 210 mm Diameter - 4 mm\\\"\",\"varientId\":44316144271605,\"varientPrice\":\"1925.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/coconut-leaf-straw-25-600x400.jpg?v=1701684079\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.088Z\",\"summarizedProductDescription\":\"\\n\\nThese straws are made from fallen coconut palm leaves, are organic and biodegradable, have no external coating, and can stay intact in liquid for hours. They have a 1 year shelf life and are made by women in rural India, resulting in a unique and natural appearance.\"},{\"_id\":\"659fbf9e720041ddd3b26eb8\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229404770549\",\"productName\":\"Leafy Straw Regular\",\"productDescription\":\"Regular - Export quality\\nLength - 210 mm Diameter - 5 mm\\nOrganic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\\n\\nRegular - Domestic quality\\nLength - 210 mm Diameter - 5 mm\\nOrganic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"2585.00\",\"varient\":[{\"varientName\":\"Regular - Export quality Length - 210 mm Diameter - 5 mm\",\"varientId\":44316112847093,\"varientPrice\":\"2585.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Regular - Domestic quality Length - 210 mm Diameter - 5 mm\\\"\",\"varientId\":44316112879861,\"varientPrice\":\"2200.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/coconut-leaf-straw-46-600x900.jpg?v=1701683568\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.112Z\",\"summarizedProductDescription\":\" These straws are made from fallen coconut palm leaves and are organic, biodegradable, and have no external coating. They have a 1 year shelf life and can stay intact in liquid for hours. They are made by women in rural India and have a natural beauty, with no two straws being exactly alike in shades. They come in two qualities: export and domestic, both with a length of 210 mm and diameter of 5 mm.\"},{\"_id\":\"659fbf9e720041ddd3b26eb9\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229423055093\",\"productName\":\"Leafy Straw Wider Straw\",\"productDescription\":\"Organic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"3025.00\",\"varient\":[{\"varientName\":\"Wider Straw  \\\"Length - 210 mm Diameter - 7.5 mm\\\"\",\"varientId\":44316279308533,\"varientPrice\":\"3025.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/tetra-pak-320x240.jpg?v=1701686285\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.124Z\",\"summarizedProductDescription\":\"\\n\\nThese straws are made from fallen coconut palm leaves, are organic and biodegradable, have no external coating, and can stay intact in liquid for hours. They have a 1 year shelf life and are made by women in rural India, resulting in a unique and natural appearance.\"},{\"_id\":\"659fbf9e720041ddd3b26eba\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8254138384629\",\"productName\":\"Rice Bran Disposable Cutlery\",\"productDescription\":\"PRIMARY MATERIAL: Rice Bran with Natural Binder (100% vegetable based)\\n\\nPLASTIC OR SYNTHETIC ADDITION:  Zero\\n\\nPRODUCT DIMENSION: 6 / 8 / 10 inches diameter\\n\\nROBUST AND STABLE, 100% NATURAL PRODUCT\\n\\nANIMAL EDIBLE, SINGLE USE\\n\\nGMO free, Vegan friendly\\n\\nSHELF LIFE: 10 months with proper storage conditions (store in cool and dry conditions, away from direct sunlight and moisture)\\n\\nDISPOSABLITY:     Biodegrade naturally in soil within 80 days, Backyard compostable, Marine disposable.\\n\\nFunctional Life: Plain plates are good for dry foods up to 3 hours, semi solid food up to 1 hour and liquid food up to 20 minutes. For fluid food content we recommend plates with added bio barrier coating.\\n\\nBio barrier coating Properties: Naturally derived barrier coating solution, 100% eco-friendly and bio derived, certified for food safe and natural soil composability. Can withstand hot and cold fluid food contents for more than 1 hour.\",\"price\":\"700.00\",\"varient\":[{\"varientName\":\"6 inches round Plain\",\"varientId\":44407652778229,\"varientPrice\":\"700.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"6 inches round with Bio Barrier coating\",\"varientId\":44407652810997,\"varientPrice\":\"780.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"8 inches round Plain\",\"varientId\":44407652843765,\"varientPrice\":\"1000.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"8 inches round with Bio Barrier coating\",\"varientId\":44407652876533,\"varientPrice\":\"1100.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"10 inches round Plain\",\"varientId\":44407652909301,\"varientPrice\":\"1200.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"10 inches round Plain with Bio Barrier coating\",\"varientId\":44407652942069,\"varientPrice\":\"13500.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Coasters 3.5 inches square  Plain\",\"varientId\":44407652974837,\"varientPrice\":\"60.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/Picture1.jpg?v=1704456438\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.157Z\",\"summarizedProductDescription\":\" This product is a 100% natural plate made from rice bran and a vegetable-based binder. It has a diameter of 6, 8, or 10 inches and is robust and stable. It is suitable for animals to eat and is GMO-free and vegan-friendly. The shelf life is 10 months with proper storage and it is biodegradable in 80 days. It can be disposed of in backyard compost or marine environments. The plain plates are best for dry foods for up to 3 hours, semi-solid foods for up to 1 hour, and liquid foods for up to 20 minutes. For fluid foods, plates with a bio barrier coating are recommended. The coating is eco-friendly, food safe, and can withstand hot and cold foods for over an hour.\"}],\"possibleUserResponses\":[\"Can you provide more details about these products?\",\"Do you have any recommendations for the best product?\",\"Can you show me the prices for these products?\"]}",
              "from": "BOT",
              "_id": "65ec22ad93003c673534f906"
          },
          {
              "time": "2024-03-09T08:50:09.654Z",
              "message": "{\"message\":\"want to talk with agent\"}",
              "from": "USER",
              "_id": "65ec22c193003c673534f90e"
          }
      ],
      "createdAt": "2024-03-09T08:49:18.632Z",
      "updatedAt": "2024-03-09T08:50:23.053Z",
      "__v": 0,
      "customer": null
  },
  {
      "_id": "65ec214793003c673534e271",
      "userId": "659e887591e16ca5f243af7a",
      "botId": "659e88d191e16ca5f243af99",
      "phoneNumber": "ada78f92-d0fd-40a3-a9a2-1c6382c6d2fe",
      "chatSessionId": "ada78f92-d0fd-40a3-a9a2-1c6382c6d2fe",
      "chat": [
          {
              "time": "2024-03-09T08:43:51.090Z",
              "message": "{\"message\":\"hi\"}",
              "from": "USER",
              "_id": "65ec214793003c673534e272"
          },
          {
              "time": "2024-03-09T08:43:59.900Z",
              "message": "{\"message\":\"Hello! How can I assist you today?\",\"wantAgent\":false,\"possibleUserResponses\":[\"Yes, I need help with finding a product.\",\"No, I'm just browsing for now.\",\"I have a question about a specific product.\"]}",
              "from": "BOT",
              "_id": "65ec214f93003c673534e27a"
          },
          {
              "time": "2024-03-09T08:44:07.656Z",
              "message": "{\"message\":\"how are you\"}",
              "from": "USER",
              "_id": "65ec215793003c673534e280"
          },
          {
              "time": "2024-03-09T08:44:17.757Z",
              "message": "{\"message\":\"Thank you for your interest in our products. Our company, Evlogiaeco, offers a variety of eco-friendly products such as reusable bags, bamboo utensils, and stainless steel straws. These products are perfect for reducing waste and living a more sustainable lifestyle. Would you like to know more about any specific product?\",\"wantAgent\":false,\"possibleUserResponses\":[\"Yes, I would like to know more about the reusable bags.\",\"Can you tell me about the bamboo utensils?\",\"I'm interested in learning more about the stainless steel straws.\"]}",
              "from": "BOT",
              "_id": "65ec216193003c673534e289"
          },
          {
              "time": "2024-03-09T08:44:32.481Z",
              "message": "{\"message\":\"I want to talk with agent\"}",
              "from": "USER",
              "_id": "65ec217093003c673534e291"
          }
      ],
      "createdAt": "2024-03-09T08:43:51.200Z",
      "updatedAt": "2024-03-09T08:47:47.376Z",
      "__v": 0,
      "customer": null
  },
  {
      "_id": "65eaf05880312ba9984190f0",
      "userId": "659e887591e16ca5f243af7a",
      "botId": "659e88d191e16ca5f243af99",
      "phoneNumber": "db36e625-20e7-4453-a25b-c253f6c8f6e6",
      "chatSessionId": "db36e625-20e7-4453-a25b-c253f6c8f6e6",
      "chat": [
          {
              "time": "2024-03-08T11:02:48.622Z",
              "message": "{\"message\":\"hi\"}",
              "from": "USER",
              "_id": "65eaf05880312ba9984190f1"
          },
          {
              "time": "2024-03-08T11:02:56.929Z",
              "message": "{\"message\":\"Hello! How can I assist you today?\",\"wantAgent\":false,\"possibleUserResponses\":[\"Yes, I need help with finding a product.\",\"No, I'm just browsing for now.\",\"I have a question about a specific product.\"]}",
              "from": "BOT",
              "_id": "65eaf06180312ba9984190f9"
          },
          {
              "time": "2024-03-08T11:03:03.738Z",
              "message": "{\"message\":\"show me some products\"}",
              "from": "USER",
              "_id": "65eaf06780312ba9984190ff"
          },
          {
              "time": "2024-03-08T11:03:18.564Z",
              "message": "{\"message\":\"Sure, here are some products that match your query.\",\"wantAgent\":false,\"productList\":[{\"_id\":\"659fbf9e720041ddd3b26eb6\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229417091317\",\"productName\":\"Leafy Straw Cocktail Straw\",\"productDescription\":\"Organic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"1925.00\",\"varient\":[{\"varientName\":\"Export quality Length - 140 mm Diameter - 5 mm\",\"varientId\":44316235956469,\"varientPrice\":\"1925.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Domestic quality Length - 140 mm Diameter - 5 mm\",\"varientId\":44316235989237,\"varientPrice\":\"1650.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/coconut-leaf-straw-7-600x400.jpg?v=1701685624\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.445Z\",\"updatedAt\":\"2024-02-07T06:07:15.077Z\",\"summarizedProductDescription\":\"\\n\\nThese straws are made from fallen coconut palm leaves, are organic and biodegradable, have no external coating, and can stay intact in liquid for hours. They have a 1 year shelf life and are made by women in rural India, resulting in a unique and natural appearance.\"},{\"_id\":\"659fbf9e720041ddd3b26eb7\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229407031541\",\"productName\":\"Leafy Straw Juice Straw\",\"productDescription\":\"Organic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"2200.00\",\"varient\":[{\"varientName\":\"Juice Straw Export quality - \\\"Length - 210 mm Diameter - 4 mm\\\"\",\"varientId\":44316144238837,\"varientPrice\":\"2200.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Juice Straw  Domestic quality - \\\"Length - 210 mm Diameter - 4 mm\\\"\",\"varientId\":44316144271605,\"varientPrice\":\"1925.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/coconut-leaf-straw-25-600x400.jpg?v=1701684079\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.088Z\",\"summarizedProductDescription\":\"\\n\\nThese straws are made from fallen coconut palm leaves, are organic and biodegradable, have no external coating, and can stay intact in liquid for hours. They have a 1 year shelf life and are made by women in rural India, resulting in a unique and natural appearance.\"},{\"_id\":\"659fbf9e720041ddd3b26eb8\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229404770549\",\"productName\":\"Leafy Straw Regular\",\"productDescription\":\"Regular - Export quality\\nLength - 210 mm Diameter - 5 mm\\nOrganic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\\n\\nRegular - Domestic quality\\nLength - 210 mm Diameter - 5 mm\\nOrganic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"2585.00\",\"varient\":[{\"varientName\":\"Regular - Export quality Length - 210 mm Diameter - 5 mm\",\"varientId\":44316112847093,\"varientPrice\":\"2585.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Regular - Domestic quality Length - 210 mm Diameter - 5 mm\\\"\",\"varientId\":44316112879861,\"varientPrice\":\"2200.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/coconut-leaf-straw-46-600x900.jpg?v=1701683568\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.112Z\",\"summarizedProductDescription\":\" These straws are made from fallen coconut palm leaves and are organic, biodegradable, and have no external coating. They have a 1 year shelf life and can stay intact in liquid for hours. They are made by women in rural India and have a natural beauty, with no two straws being exactly alike in shades. They come in two qualities: export and domestic, both with a length of 210 mm and diameter of 5 mm.\"},{\"_id\":\"659fbf9e720041ddd3b26eb9\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229423055093\",\"productName\":\"Leafy Straw Wider Straw\",\"productDescription\":\"Organic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"3025.00\",\"varient\":[{\"varientName\":\"Wider Straw  \\\"Length - 210 mm Diameter - 7.5 mm\\\"\",\"varientId\":44316279308533,\"varientPrice\":\"3025.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/tetra-pak-320x240.jpg?v=1701686285\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.124Z\",\"summarizedProductDescription\":\"\\n\\nThese straws are made from fallen coconut palm leaves, are organic and biodegradable, have no external coating, and can stay intact in liquid for hours. They have a 1 year shelf life and are made by women in rural India, resulting in a unique and natural appearance.\"},{\"_id\":\"659fbf9e720041ddd3b26eba\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8254138384629\",\"productName\":\"Rice Bran Disposable Cutlery\",\"productDescription\":\"PRIMARY MATERIAL: Rice Bran with Natural Binder (100% vegetable based)\\n\\nPLASTIC OR SYNTHETIC ADDITION:  Zero\\n\\nPRODUCT DIMENSION: 6 / 8 / 10 inches diameter\\n\\nROBUST AND STABLE, 100% NATURAL PRODUCT\\n\\nANIMAL EDIBLE, SINGLE USE\\n\\nGMO free, Vegan friendly\\n\\nSHELF LIFE: 10 months with proper storage conditions (store in cool and dry conditions, away from direct sunlight and moisture)\\n\\nDISPOSABLITY:     Biodegrade naturally in soil within 80 days, Backyard compostable, Marine disposable.\\n\\nFunctional Life: Plain plates are good for dry foods up to 3 hours, semi solid food up to 1 hour and liquid food up to 20 minutes. For fluid food content we recommend plates with added bio barrier coating.\\n\\nBio barrier coating Properties: Naturally derived barrier coating solution, 100% eco-friendly and bio derived, certified for food safe and natural soil composability. Can withstand hot and cold fluid food contents for more than 1 hour.\",\"price\":\"700.00\",\"varient\":[{\"varientName\":\"6 inches round Plain\",\"varientId\":44407652778229,\"varientPrice\":\"700.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"6 inches round with Bio Barrier coating\",\"varientId\":44407652810997,\"varientPrice\":\"780.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"8 inches round Plain\",\"varientId\":44407652843765,\"varientPrice\":\"1000.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"8 inches round with Bio Barrier coating\",\"varientId\":44407652876533,\"varientPrice\":\"1100.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"10 inches round Plain\",\"varientId\":44407652909301,\"varientPrice\":\"1200.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"10 inches round Plain with Bio Barrier coating\",\"varientId\":44407652942069,\"varientPrice\":\"13500.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Coasters 3.5 inches square  Plain\",\"varientId\":44407652974837,\"varientPrice\":\"60.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/Picture1.jpg?v=1704456438\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.157Z\",\"summarizedProductDescription\":\" This product is a 100% natural plate made from rice bran and a vegetable-based binder. It has a diameter of 6, 8, or 10 inches and is robust and stable. It is suitable for animals to eat and is GMO-free and vegan-friendly. The shelf life is 10 months with proper storage and it is biodegradable in 80 days. It can be disposed of in backyard compost or marine environments. The plain plates are best for dry foods for up to 3 hours, semi-solid foods for up to 1 hour, and liquid foods for up to 20 minutes. For fluid foods, plates with a bio barrier coating are recommended. The coating is eco-friendly, food safe, and can withstand hot and cold foods for over an hour.\"}],\"possibleUserResponses\":[\"Can you provide more details about these products?\",\"Do you have any recommendations for the best product?\",\"Can you show me the prices for these products?\"]}",
              "from": "BOT",
              "_id": "65eaf07680312ba99841910c"
          },
          {
              "time": "2024-03-08T11:03:38.062Z",
              "message": "{\"message\":\"can I talk to agent\"}",
              "from": "USER",
              "_id": "65eaf08a80312ba998419114"
          }
      ],
      "createdAt": "2024-03-08T11:02:48.762Z",
      "updatedAt": "2024-03-08T11:03:55.864Z",
      "__v": 0,
      "customer": null
  },
  {
      "_id": "65e20ecc191de2d7fc9177c2",
      "userId": "659e887591e16ca5f243af7a",
      "botId": "659e88d191e16ca5f243af99",
      "phoneNumber": "d918db7b-9d9f-4994-aee6-8a34b4251183",
      "chatSessionId": "d918db7b-9d9f-4994-aee6-8a34b4251183",
      "chat": [
          {
              "time": "2024-03-01T17:22:20.822Z",
              "message": "{\"message\":\"Hi\"}",
              "from": "USER",
              "_id": "65e20ecc191de2d7fc9177c3"
          },
          {
              "time": "2024-03-01T17:22:28.607Z",
              "message": "{\"message\":\"Hello! How can I assist you with your order?\",\"wantAgent\":false,\"possibleUserResponses\":[\"Yes, I need help with my order.\",\"No, I don't need help with my order.\",\"Can you tell me the status of my order?\"]}",
              "from": "BOT",
              "_id": "65e20ed4191de2d7fc9177cb"
          },
          {
              "time": "2024-03-01T17:23:12.831Z",
              "message": "{\"message\":\"Show me some products\"}",
              "from": "USER",
              "_id": "65e20f00191de2d7fc9177d1"
          },
          {
              "time": "2024-03-01T17:23:25.272Z",
              "message": "{\"message\":\"Sure, here are some products that match your order:\",\"wantAgent\":false,\"productList\":[{\"_id\":\"659fbf9e720041ddd3b26eb6\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229417091317\",\"productName\":\"Leafy Straw Cocktail Straw\",\"productDescription\":\"Organic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"1925.00\",\"varient\":[{\"varientName\":\"Export quality Length - 140 mm Diameter - 5 mm\",\"varientId\":44316235956469,\"varientPrice\":\"1925.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Domestic quality Length - 140 mm Diameter - 5 mm\",\"varientId\":44316235989237,\"varientPrice\":\"1650.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/coconut-leaf-straw-7-600x400.jpg?v=1701685624\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.445Z\",\"updatedAt\":\"2024-02-07T06:07:15.077Z\",\"summarizedProductDescription\":\"\\n\\nThese straws are made from fallen coconut palm leaves, are organic and biodegradable, have no external coating, and can stay intact in liquid for hours. They have a 1 year shelf life and are made by women in rural India, resulting in a unique and natural appearance.\"},{\"_id\":\"659fbf9e720041ddd3b26eb7\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229407031541\",\"productName\":\"Leafy Straw Juice Straw\",\"productDescription\":\"Organic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"2200.00\",\"varient\":[{\"varientName\":\"Juice Straw Export quality - \\\"Length - 210 mm Diameter - 4 mm\\\"\",\"varientId\":44316144238837,\"varientPrice\":\"2200.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Juice Straw  Domestic quality - \\\"Length - 210 mm Diameter - 4 mm\\\"\",\"varientId\":44316144271605,\"varientPrice\":\"1925.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/coconut-leaf-straw-25-600x400.jpg?v=1701684079\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.088Z\",\"summarizedProductDescription\":\"\\n\\nThese straws are made from fallen coconut palm leaves, are organic and biodegradable, have no external coating, and can stay intact in liquid for hours. They have a 1 year shelf life and are made by women in rural India, resulting in a unique and natural appearance.\"},{\"_id\":\"659fbf9e720041ddd3b26eb8\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229404770549\",\"productName\":\"Leafy Straw Regular\",\"productDescription\":\"Regular - Export quality\\nLength - 210 mm Diameter - 5 mm\\nOrganic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\\n\\nRegular - Domestic quality\\nLength - 210 mm Diameter - 5 mm\\nOrganic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"2585.00\",\"varient\":[{\"varientName\":\"Regular - Export quality Length - 210 mm Diameter - 5 mm\",\"varientId\":44316112847093,\"varientPrice\":\"2585.00\",\"varientSku\":\"\",\"isOutOfStock\":false},{\"varientName\":\"Regular - Domestic quality Length - 210 mm Diameter - 5 mm\\\"\",\"varientId\":44316112879861,\"varientPrice\":\"2200.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/coconut-leaf-straw-46-600x900.jpg?v=1701683568\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.112Z\",\"summarizedProductDescription\":\" These straws are made from fallen coconut palm leaves and are organic, biodegradable, and have no external coating. They have a 1 year shelf life and can stay intact in liquid for hours. They are made by women in rural India and have a natural beauty, with no two straws being exactly alike in shades. They come in two qualities: export and domestic, both with a length of 210 mm and diameter of 5 mm.\"},{\"_id\":\"659fbf9e720041ddd3b26eb9\",\"userId\":\"659e887591e16ca5f243af7a\",\"storeId\":\"659e88bb91e16ca5f243af7e\",\"productId\":\"8229423055093\",\"productName\":\"Leafy Straw Wider Straw\",\"productDescription\":\"Organic, Biodegradable Made from fallen down coconut palm leaves No external coating Stays intact in liquid for hours 1 year shelf life Natural beauty No two straws will be exactly similar in shades Made by women of rural India\",\"price\":\"3025.00\",\"varient\":[{\"varientName\":\"Wider Straw  \\\"Length - 210 mm Diameter - 7.5 mm\\\"\",\"varientId\":44316279308533,\"varientPrice\":\"3025.00\",\"varientSku\":\"\",\"isOutOfStock\":false}],\"productSku\":\"\",\"hasVarient\":true,\"relatedProducts\":[],\"images\":[\"https://cdn.shopify.com/s/files/1/0675/5464/0117/files/tetra-pak-320x240.jpg?v=1701686285\"],\"__v\":0,\"createdAt\":\"2024-01-11T10:14:54.446Z\",\"updatedAt\":\"2024-02-07T06:07:15.124Z\",\"summarizedProductDescription\":\"\\n\\nThese straws are made from fallen coconut palm leaves, are organic and biodegradable, have no external coating, and can stay intact in liquid for hours. They have a 1 year shelf life and are made by women in rural India, resulting in a unique and natural appearance.\"}],\"possibleUserResponses\":[\"Can you provide more details about these products?\",\"Can I see images of these products?\",\"Can you recommend any similar products?\"]}",
              "from": "BOT",
              "_id": "65e20f0d191de2d7fc9177de"
          },
          {
              "time": "2024-03-01T17:24:55.302Z",
              "message": "{\"message\":\"talk to agent\"}",
              "from": "USER",
              "_id": "65e20f67191de2d7fc9177ec"
          }
      ],
      "createdAt": "2024-03-01T17:22:20.843Z",
      "updatedAt": "2024-03-01T17:59:39.188Z",
      "__v": 0,
      "customer": null
  }
];

const ChatStatus = ({ checkValid, isFetchLiveConversation }) => {
  const { liveUser, setliveUser } = useContext(ChatAppContext);
  const { liveConversation, setLiveConversation } = appStore.getState();
  function calculateTimePassed(timestamp) {
    const currentTime = new Date().getTime();
    timestamp = new Date(timestamp).getTime();
    const timeDifference = currentTime - timestamp;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timePassedString = "";
    if (days > 0) return (timePassedString += `${days}d`);
    if (hours > 0) return (timePassedString += `${hours % 24}h`);
    if (minutes > 0) return (timePassedString += `${minutes % 60}m`);
    if (seconds > 0) return (timePassedString += `${seconds % 60}s`);
    return timePassedString;
  }

  var activeChat = 0;
  if (liveUser != null) activeChat = liveUser._id;

  const checkMessageType = (data) => {
    // Parse the JSON string
    try {
      const parsedObject = JSON.parse(data);

      // Check if parsedObject has the expected properties
      return parsedObject.message.slice(0, 25);
    } catch (error) {
      return data.slice(0, 25);
    }
  };

  useEffect(() => {
    if (!isFetchLiveConversation && liveConversation.length) {
      setliveUser(liveConversation[0]);
      checkValid(liveConversation[0]);
      // setLiveConversation(sampleMsgs);
    }
    // console.log('liveConversation -->', liveConversation);
  }, [isFetchLiveConversation]);

  // useEffect(() => {
  //   console.log('liveConversation[0] ==>', liveConversation);
  //   if(liveConversation.length){

  //   }
  // }, [])

  return (
    <Fragment>
      <div className="chat-box" style={{ height: "100%", overflowY: "hidden" }}>
        <div className="chat-left-aside  h-100">
          {/* <CurrentUser /> */}
          <h5>Your Inbox</h5>
          <div className="people-list" id="people-list">
            {isFetchLiveConversation ? (
              <div className="loader-box">
                <Spinner attrSpinner={{ className: "loader-3" }} />
              </div>
            ) : (
              <>
                <SearchChatList />
                {liveConversation && liveConversation.length > 0 ? (
                  <UL
                    attrUL={{ className: "simple-list list custom-scrollbar" }}
                  >
                    {liveConversation?.map((item, i) => {
                      return (
                        <LI
                          attrLI={{
                            className: `clearfix border border-white`,
                            style: customStyles?.listItem,
                            onClick: () => {
                              activeChat = item._id;
                              checkValid(item);
                              setliveUser(item);
                            },
                          }}
                          key={i}
                        >
                          <Media style={customStyles?.mediaContainer} className={`d-flex align-items-center ${
                                activeChat === item?._id &&
                                `${customStyles?.selectedMsg}`
                              }`}>
                            {/* <Image
                              attrImage={{
                                src: `${UserProfile}`,
                                className: "rounded-circle user-image",
                                alt: "",
                              }}
                            /> */}
                            {/* <div className={`status-circle ${item.online === true ? 'online' : 'offline'}`}
                        ></div> */}
                            <Media body>
                              <div style={customStyles?.aboutStyle} className="about">
                                <div className="name">
                                  {item?.customer?.firstName &&
                                  item?.customer?.firstName !== ""
                                    ? `${
                                        item?.customer?.firstName +
                                        " " +
                                        item?.customer?.lastName
                                      }`
                                    : item?.chatSessionId ? `Web User-${item?.chatSessionId?.slice(-4)}` : item?.phoneNumber}
                                    <br />
                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                    <div>
                                      {item?.chatSessionId ? <HiMiniComputerDesktop style={customStyles?.iconStyles}/> : <FaWhatsapp style={customStyles?.iconStyles}/>}
                                      </div>
                                      <div>
                                      <p
                                      style={customStyles?.chatInfoTxt}
                                    >
                                      {`#${item?.chat?.length}`}
                                    </p>
                                      </div>
                                      <div>
                                      <p
                                      style={customStyles?.chatInfoTxt}
                                    >
                                      {getLocaleTimeFormat(`${item?.updatedAt}`)}
                                    </p>
                                      </div>
                                  {/* <div className="status fw-bolder">
                                    {calculateTimePassed(
                                      item?.chat[item?.chat.length - 1].time
                                    )}
                                  </div> */}
                                </div>
                                <div style={customStyles?.msgLineTxt} className="status">
                                    {checkMessageType(
                                      item?.chat[item?.chat.length - 1]?.message
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Media>
                          </Media>
                        </LI>
                      );
                    })}
                  </UL>
                ) : (
                  <div
                    style={{ border: "1px solid none" }}
                    className="mw-100 mh-100 d-flex align-items-center justify-content-center"
                  >
                    <H6>No Live Chats Available</H6>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ChatStatus;

/*

*/
