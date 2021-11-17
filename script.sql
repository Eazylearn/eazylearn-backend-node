--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg18.04+1)
-- Dumped by pg_dump version 13.4

-- Started on 2021-11-17 15:35:59

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

--
-- TOC entry 9 (class 3079 OID 17135)
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- TOC entry 4091 (class 0 OID 0)
-- Dependencies: 9
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- TOC entry 5 (class 3079 OID 17676)
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- TOC entry 4092 (class 0 OID 0)
-- Dependencies: 5
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- TOC entry 16 (class 3079 OID 16661)
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- TOC entry 4093 (class 0 OID 0)
-- Dependencies: 16
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- TOC entry 7 (class 3079 OID 17573)
-- Name: cube; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- TOC entry 4094 (class 0 OID 0)
-- Dependencies: 7
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- TOC entry 22 (class 3079 OID 16384)
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- TOC entry 4095 (class 0 OID 0)
-- Dependencies: 22
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- TOC entry 10 (class 3079 OID 17130)
-- Name: dict_int; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_int WITH SCHEMA public;


--
-- TOC entry 4096 (class 0 OID 0)
-- Dependencies: 10
-- Name: EXTENSION dict_int; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_int IS 'text search dictionary template for integers';


--
-- TOC entry 4 (class 3079 OID 18299)
-- Name: dict_xsyn; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_xsyn WITH SCHEMA public;


--
-- TOC entry 4097 (class 0 OID 0)
-- Dependencies: 4
-- Name: EXTENSION dict_xsyn; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_xsyn IS 'text search dictionary template for extended synonym processing';


--
-- TOC entry 6 (class 3079 OID 17660)
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- TOC entry 4098 (class 0 OID 0)
-- Dependencies: 6
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- TOC entry 17 (class 3079 OID 16650)
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- TOC entry 4099 (class 0 OID 0)
-- Dependencies: 17
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- TOC entry 11 (class 3079 OID 17007)
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- TOC entry 4100 (class 0 OID 0)
-- Dependencies: 11
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- TOC entry 12 (class 3079 OID 16889)
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- TOC entry 4101 (class 0 OID 0)
-- Dependencies: 12
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- TOC entry 20 (class 3079 OID 16444)
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- TOC entry 4102 (class 0 OID 0)
-- Dependencies: 20
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- TOC entry 2 (class 3079 OID 18311)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- TOC entry 4103 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track execution statistics of all SQL statements executed';


--
-- TOC entry 13 (class 3079 OID 16812)
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- TOC entry 4104 (class 0 OID 0)
-- Dependencies: 13
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- TOC entry 14 (class 3079 OID 16775)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 4105 (class 0 OID 0)
-- Dependencies: 14
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 8 (class 3079 OID 17571)
-- Name: pgrowlocks; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgrowlocks WITH SCHEMA public;


--
-- TOC entry 4106 (class 0 OID 0)
-- Dependencies: 8
-- Name: EXTENSION pgrowlocks; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgrowlocks IS 'show row-level locking information';


--
-- TOC entry 19 (class 3079 OID 16619)
-- Name: pgstattuple; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgstattuple WITH SCHEMA public;


--
-- TOC entry 4107 (class 0 OID 0)
-- Dependencies: 19
-- Name: EXTENSION pgstattuple; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgstattuple IS 'show tuple-level statistics';


--
-- TOC entry 18 (class 3079 OID 16629)
-- Name: tablefunc; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS tablefunc WITH SCHEMA public;


--
-- TOC entry 4108 (class 0 OID 0)
-- Dependencies: 18
-- Name: EXTENSION tablefunc; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION tablefunc IS 'functions that manipulate whole tables, including crosstab';


--
-- TOC entry 3 (class 3079 OID 18304)
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- TOC entry 4109 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- TOC entry 15 (class 3079 OID 16764)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4110 (class 0 OID 0)
-- Dependencies: 15
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 21 (class 3079 OID 16430)
-- Name: xml2; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS xml2 WITH SCHEMA public;


--
-- TOC entry 4111 (class 0 OID 0)
-- Dependencies: 21
-- Name: EXTENSION xml2; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION xml2 IS 'XPath querying and XSLT';


SET default_tablespace = '';

--
-- TOC entry 222 (class 1259 OID 384933965)
-- Name: account; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.account (
    account_id character varying NOT NULL,
    password character varying,
    type integer
);

--
-- TOC entry 225 (class 1259 OID 384934018)
-- Name: course; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.course (
    course_id character varying NOT NULL,
    course_name character varying,
    academic_year character varying,
    semester integer
);

--
-- TOC entry 224 (class 1259 OID 384934005)
-- Name: lecturer; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.lecturer (
    lecturer_id character varying NOT NULL,
    lecturer_name character varying,
    account_id character varying
);

--
-- TOC entry 227 (class 1259 OID 384934065)
-- Name: lecturer_course; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.lecturer_course (
    lecturer_id character varying NOT NULL,
    course_id character varying NOT NULL
);

--
-- TOC entry 231 (class 1259 OID 385047594)
-- Name: option; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.option (
    question_id character varying NOT NULL,
    content character varying NOT NULL,
    is_answer boolean
);

--
-- TOC entry 229 (class 1259 OID 384934096)
-- Name: question; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.question (
    question_id character varying NOT NULL,
    question_content character varying
);

--
-- TOC entry 228 (class 1259 OID 384934083)
-- Name: quiz; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.quiz (
    quiz_id character varying NOT NULL,
    quiz_name character varying,
    time_limit integer,
    course_id character varying
);

--
-- TOC entry 230 (class 1259 OID 385047576)
-- Name: quiz_question; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.quiz_question (
    question_id character varying NOT NULL,
    quiz_id character varying NOT NULL
);

--
-- TOC entry 233 (class 1259 OID 396471504)
-- Name: result; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.result (
    result_id integer NOT NULL,
    student_id character varying,
    quiz_id character varying,
    time_taken integer,
    score double precision,
    student_answer character varying
);

--
-- TOC entry 232 (class 1259 OID 396471502)
-- Name: result_result_id_seq; Type: SEQUENCE; Schema: public; Owner: mknxrjuz
--

CREATE SEQUENCE public.result_result_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 4112 (class 0 OID 0)
-- Dependencies: 232
-- Name: result_result_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mknxrjuz
--

ALTER SEQUENCE public.result_result_id_seq OWNED BY public.result.result_id;


--
-- TOC entry 223 (class 1259 OID 384933992)
-- Name: student; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.student (
    student_id character varying NOT NULL,
    student_name character varying,
    class_id character varying,
    account_id character varying
);

--
-- TOC entry 226 (class 1259 OID 384934032)
-- Name: student_course; Type: TABLE; Schema: public; Owner: mknxrjuz
--

CREATE TABLE public.student_course (
    student_id character varying NOT NULL,
    course_id character varying NOT NULL
);

--
-- TOC entry 3929 (class 2604 OID 396471507)
-- Name: result result_id; Type: DEFAULT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.result ALTER COLUMN result_id SET DEFAULT nextval('public.result_result_id_seq'::regclass);


--
-- TOC entry 3931 (class 2606 OID 384933972)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);


--
-- TOC entry 3937 (class 2606 OID 384934025)
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (course_id);


--
-- TOC entry 3941 (class 2606 OID 384934072)
-- Name: lecturer_course lecturer_course_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.lecturer_course
    ADD CONSTRAINT lecturer_course_pkey PRIMARY KEY (lecturer_id, course_id);


--
-- TOC entry 3935 (class 2606 OID 384934012)
-- Name: lecturer lecturer_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.lecturer
    ADD CONSTRAINT lecturer_pkey PRIMARY KEY (lecturer_id);


--
-- TOC entry 3949 (class 2606 OID 385047601)
-- Name: option option_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.option
    ADD CONSTRAINT option_pkey PRIMARY KEY (question_id, content);


--
-- TOC entry 3945 (class 2606 OID 384934103)
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (question_id);


--
-- TOC entry 3943 (class 2606 OID 384934090)
-- Name: quiz quiz_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_pkey PRIMARY KEY (quiz_id);


--
-- TOC entry 3947 (class 2606 OID 385047583)
-- Name: quiz_question quiz_question_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.quiz_question
    ADD CONSTRAINT quiz_question_pkey PRIMARY KEY (question_id, quiz_id);


--
-- TOC entry 3951 (class 2606 OID 396471512)
-- Name: result result_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT result_pkey PRIMARY KEY (result_id);


--
-- TOC entry 3939 (class 2606 OID 384934039)
-- Name: student_course student_course_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.student_course
    ADD CONSTRAINT student_course_pkey PRIMARY KEY (student_id, course_id);


--
-- TOC entry 3933 (class 2606 OID 384933999)
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (student_id);


--
-- TOC entry 3953 (class 2606 OID 384934013)
-- Name: lecturer lecturer_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.lecturer
    ADD CONSTRAINT lecturer_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(account_id);


--
-- TOC entry 3957 (class 2606 OID 384934078)
-- Name: lecturer_course lecturer_course_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.lecturer_course
    ADD CONSTRAINT lecturer_course_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);


--
-- TOC entry 3956 (class 2606 OID 384934073)
-- Name: lecturer_course lecturer_course_lecturer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.lecturer_course
    ADD CONSTRAINT lecturer_course_lecturer_id_fkey FOREIGN KEY (lecturer_id) REFERENCES public.lecturer(lecturer_id);


--
-- TOC entry 3961 (class 2606 OID 385047602)
-- Name: option option_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.option
    ADD CONSTRAINT option_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question(question_id);


--
-- TOC entry 3958 (class 2606 OID 384934091)
-- Name: quiz quiz_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);


--
-- TOC entry 3959 (class 2606 OID 385047584)
-- Name: quiz_question quiz_question_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.quiz_question
    ADD CONSTRAINT quiz_question_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question(question_id);


--
-- TOC entry 3960 (class 2606 OID 385047589)
-- Name: quiz_question quiz_question_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.quiz_question
    ADD CONSTRAINT quiz_question_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quiz(quiz_id);


--
-- TOC entry 3963 (class 2606 OID 396471518)
-- Name: result result_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT result_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quiz(quiz_id);


--
-- TOC entry 3962 (class 2606 OID 396471513)
-- Name: result result_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT result_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(student_id);


--
-- TOC entry 3952 (class 2606 OID 384934000)
-- Name: student student_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(account_id);


--
-- TOC entry 3955 (class 2606 OID 384934045)
-- Name: student_course student_course_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.student_course
    ADD CONSTRAINT student_course_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);


--
-- TOC entry 3954 (class 2606 OID 384934040)
-- Name: student_course student_course_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mknxrjuz
--

ALTER TABLE ONLY public.student_course
    ADD CONSTRAINT student_course_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(student_id);


-- Completed on 2021-11-17 15:39:09

--
-- PostgreSQL database dump complete
--

