CREATE TABLE public.user (
    id INTEGER NOT NULL,
    name CHARACTER VARYING NOT NULL,
    email CHARACTER VARYING NOT NULL,
    cpf CHARACTER VARYING NOT NULL,
    type_user INT NOT NULL,
    phone CHARACTER VARYING NOT NULL,
    password CHARACTER VARYING NOT NULL,
    created_at TIMESTAMP without time zone DEFAULT now() NOT NULL,
    updated_at  TIMESTAMP without time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
)

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.user_id_seq OWNED BY public.user.id;

ALTER TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass)