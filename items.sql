--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Homebrew)
-- Dumped by pg_dump version 15.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: items; Type: TABLE; Schema: public; Owner: zhangjiayi
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    store character varying(50),
    price_sgd numeric(10,2),
    type character varying(50),
    cooking_involved boolean,
    dietary character varying(20)
);


ALTER TABLE public.items OWNER TO zhangjiayi;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: zhangjiayi
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO zhangjiayi;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhangjiayi
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: zhangjiayi
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: zhangjiayi
--

COPY public.items (id, name, store, price_sgd, type, cooking_involved, dietary) FROM stdin;
1	McSpicy Burger	McDonald's	6.95	Burger	f	Halal
2	Double Cheeseburger	McDonald's	5.50	Burger	f	Halal
3	Filet-O-Fish	McDonald's	5.20	Burger	f	Halal
4	Chicken McNuggets (6pc)	McDonald's	5.50	Chicken	f	Halal
5	McCrispy Chicken Burger	McDonald's	6.95	Burger	f	Halal
6	Big Mac	McDonald's	6.50	Burger	f	Halal
7	Quarter Pounder with Cheese	McDonald's	7.20	Burger	f	Halal
8	Happy Meal (Chicken Burger)	McDonald's	5.60	Kids Meal	f	Halal
9	Happy Meal (Nuggets)	McDonald's	5.60	Kids Meal	f	Halal
10	Big Breakfast	McDonald's	7.50	Breakfast	f	Halal
11	Hotcakes	McDonald's	4.80	Breakfast	f	Halal
12	Sausage McMuffin with Egg	McDonald's	5.00	Breakfast	f	Halal
13	Egg McMuffin	McDonald's	4.50	Breakfast	f	Halal
14	French Fries (Large)	McDonald's	3.20	Side	f	Halal
15	Apple Pie	McDonald's	1.80	Dessert	f	Halal
16	McFlurry (Oreo)	McDonald's	3.80	Dessert	f	Halal
17	Sundae (Chocolate)	McDonald's	2.50	Dessert	f	Halal
18	Iced Milo (Large)	McDonald's	3.20	Beverage	f	Halal
19	Coke (Large)	McDonald's	2.80	Beverage	f	Halal
20	Coffee (Regular)	McDonald's	2.50	Beverage	f	Halal
21	Cheeseburger	McDonald's	3.50	Burger	f	Halal
22	Grilled Chicken Burger	McDonald's	6.20	Burger	f	Halal
23	McWings (2pc)	McDonald's	4.50	Chicken	f	Halal
24	Salad (Garden)	McDonald's	4.00	Salad	f	Halal
25	Hashbrown	McDonald's	2.00	Breakfast	f	Halal
26	McChicken Burger	McDonald's	5.20	Burger	f	Halal
27	Chocolate Muffin	McDonald's	2.20	Breakfast	f	Halal
28	Vanilla Cone	McDonald's	1.50	Dessert	f	Halal
29	Milo Dinosaur	McDonald's	3.50	Beverage	f	Halal
30	Tea (Hot)	McDonald's	2.00	Beverage	f	Halal
31	2pc Chicken Meal	KFC	6.90	Chicken	f	Halal
32	3pc Chicken Meal	KFC	8.90	Chicken	f	Halal
33	Zinger Burger	KFC	6.50	Burger	f	Halal
34	Cheesy Zinger	KFC	7.20	Burger	f	Halal
35	Twister	KFC	6.20	Wrap	f	Halal
36	Popcorn Chicken (Regular)	KFC	4.50	Chicken	f	Halal
37	Colonel's Burger	KFC	5.20	Burger	f	Halal
38	Colonel's Delight Burger	KFC	5.50	Burger	f	Halal
39	Egg Tart	KFC	1.80	Dessert	f	Halal
40	Coleslaw (Regular)	KFC	2.50	Side	f	Halal
41	French Fries (Regular)	KFC	3.00	Side	f	Halal
42	Mashed Potato	KFC	3.20	Side	f	Halal
43	Hot Wings (2pc)	KFC	3.90	Chicken	f	Halal
44	Porridge	KFC	4.80	Meal	f	Halal
45	Rice Bowl	KFC	5.50	Meal	f	Halal
46	Cheezy Fries	KFC	4.20	Side	f	Halal
47	Nuggets (6pc)	KFC	4.50	Chicken	f	Halal
48	Chocolate Sundae	KFC	2.80	Dessert	f	Halal
49	Iced Lemon Tea	KFC	2.20	Beverage	f	Halal
50	Pepsi (Regular)	KFC	2.00	Beverage	f	Halal
51	Original Glazed Doughnut	Krispy Kreme	2.80	Doughnut	f	Halal
52	Chocolate Iced Glazed	Krispy Kreme	3.20	Doughnut	f	Halal
53	Caramel Iced Glazed	Krispy Kreme	3.20	Doughnut	f	Halal
54	Strawberry Iced Glazed	Krispy Kreme	3.20	Doughnut	f	Halal
55	Original Glazed Dozen	Krispy Kreme	29.60	Doughnut	f	Halal
56	Assorted Dozen	Krispy Kreme	32.00	Doughnut	f	Halal
57	Nutty Choco Doughnut	Krispy Kreme	3.50	Doughnut	f	Halal
58	Cookies & Kreme	Krispy Kreme	3.50	Doughnut	f	Halal
59	Oreo Cheesecake	Krispy Kreme	3.80	Doughnut	f	Halal
60	New York Cheesecake	Krispy Kreme	3.80	Doughnut	f	Halal
61	Signature Latte	Krispy Kreme	5.50	Beverage	f	Halal
62	Iced Americano	Krispy Kreme	4.80	Beverage	f	Halal
63	Hot Chocolate	Krispy Kreme	4.50	Beverage	f	Halal
64	Iced Milo	Krispy Kreme	4.20	Beverage	f	Halal
65	Bottled Water	Krispy Kreme	2.50	Beverage	f	Halal
66	Glazed Doughnut Hole (10pc)	Krispy Kreme	6.50	Doughnut	f	Halal
67	Chocolate Doughnut Hole (10pc)	Krispy Kreme	6.50	Doughnut	f	Halal
68	Doughnut Box (4pc)	Krispy Kreme	12.00	Doughnut	f	Halal
69	Doughnut Box (8pc)	Krispy Kreme	22.00	Doughnut	f	Halal
70	Seasonal Special Doughnut	Krispy Kreme	4.00	Doughnut	f	Halal
71	Malaysia Lady Finger 250g	Sheng Siong	1.20	Vegetable	t	Halal
72	China Kai Lan 250g	Sheng Siong	1.45	Vegetable	t	Halal
73	China Cai Xin 250g	Sheng Siong	1.45	Vegetable	t	Halal
74	China Xiang Mai 300g	Sheng Siong	1.60	Vegetable	t	Halal
75	Thailand Baby Corn 100g	Sheng Siong	1.38	Vegetable	t	Halal
76	China Baby Qing Bai 250g	Sheng Siong	1.45	Vegetable	t	Halal
77	Malaysia Cameron White Sweet Corn 1pc	Sheng Siong	2.50	Vegetable	t	Halal
78	Malaysia Red Cherry Tomato 320g	Sheng Siong	2.85	Vegetable	t	Halal
79	China Spinach 200g	Sheng Siong	1.75	Vegetable	t	Halal
80	USA Russet Potato 1pc	Sheng Siong	0.70	Vegetable	t	Halal
81	China Enoki Mushroom 200g	Sheng Siong	0.75	Vegetable	t	Halal
82	El-Dina Home-Style Balacan Chilli 200g	Sheng Siong	3.81	Seasoning	t	Halal
83	Marigold King Of Kings Full Cream Evaporated Milk 395g	Sheng Siong	2.15	Dairy	t	Halal
84	Hal Di Lao Tomato Hot Pot Sauce 120g	Sheng Siong	1.80	Seasoning	t	Halal
85	Bakers' Choice Superfine Wheat Flour 1kg	Sheng Siong	1.85	Baking	t	Halal
86	Maggi Satay Chicken Paste 100g	Sheng Siong	2.10	Seasoning	t	Halal
87	Maggi Aromatic Spiced Chicken Paste 100g	Sheng Siong	2.10	Seasoning	t	Halal
88	Maggi Lemongrass Chicken Paste 100g	Sheng Siong	2.10	Seasoning	t	Halal
89	BAMBOE Spice Mix Rendang 35g	Sheng Siong	1.81	Seasoning	t	Halal
90	BAMBOE Spice Mix Soto Ayam 40g	Sheng Siong	1.81	Seasoning	t	Halal
91	Happy Family Chicken Rice Chilli Sauce 230g	Sheng Siong	2.40	Seasoning	t	Halal
92	Maltsuri Oyster Sauce 510g	Sheng Siong	3.07	Seasoning	t	Non-Halal
93	Hal Di Lao Hot Pot Soup Base 110g	Sheng Siong	4.50	Seasoning	t	Halal
94	Natural Organic Pasta Fusilli 500g	Sheng Siong	3.56	Pasta	t	Halal
95	Natural Organic Pasta Macaroni 500g	Sheng Siong	3.56	Pasta	t	Halal
96	Natural Organic Pasta Penne 500g	Sheng Siong	3.56	Pasta	t	Halal
97	Natural Organic Pasta Vermicelli 250g	Sheng Siong	1.80	Pasta	t	Halal
98	WHITE PIGEON Beeltoon Cap Merpati 400g	Sheng Siong	1.20	Seasoning	t	Halal
99	Happy Family Flour Vermicelli 250g	Sheng Siong	1.35	Pasta	t	Halal
100	Happy Family Claypot Yee Mee 375g	Sheng Siong	2.05	Noodles	t	Halal
101	Happy Family Rotini Macaroni 400g	Sheng Siong	2.20	Pasta	t	Halal
102	Happy Family Spaghetti Pasta 400g	Sheng Siong	2.20	Pasta	t	Halal
103	Happy Family Elbow Macaroni 400g	Sheng Siong	2.20	Pasta	t	Halal
104	Natural Pasta Sauce - Tomato with Pepper 340g	Sheng Siong	6.20	Sauce	t	Halal
105	Natural Pasta Sauce - Tomato with Kale 340g	Sheng Siong	6.20	Sauce	t	Halal
106	Silver Pomfret 300-400g	Sheng Siong	3.99	Seafood	t	Non-Halal
107	Frozen Pork Collar Steak 500g	Sheng Siong	6.45	Meat	t	Non-Halal
108	Le Bao Frozen Pork Soft Bone 400g	Sheng Siong	5.50	Meat	t	Non-Halal
109	Le Bao Frozen Pork Collar Slices 300g	Sheng Siong	5.50	Meat	t	Non-Halal
110	Le Bao Frozen Steamboat Pork Belly Slices 300g	Sheng Siong	5.80	Meat	t	Non-Halal
111	Le Bao Frozen Steamboat Pork Collar Slices 500g	Sheng Siong	8.50	Meat	t	Non-Halal
112	Le Bao Frozen Minced Meat 500g	Sheng Siong	4.40	Meat	t	Non-Halal
113	Le Bao Frozen Packet Chicken Drumstick 450g	Sheng Siong	5.50	Poultry	t	Halal
114	Jean Fresh Packet Chicken Breast 200g	Sheng Siong	2.78	Poultry	t	Halal
115	Jean Fresh Packet Chicken Inner Fillet 500g	Sheng Siong	2.78	Poultry	t	Halal
116	MD Plain Breaded Chicken 500g	Sheng Siong	5.48	Poultry	t	Halal
117	MD Southern Fried Chicken 500g	Sheng Siong	5.48	Poultry	t	Halal
\.


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhangjiayi
--

SELECT pg_catalog.setval('public.items_id_seq', 117, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: zhangjiayi
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

