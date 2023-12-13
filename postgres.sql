-- ----------------------------
-- Function structure for uuid_generate_v1
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v1"() RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp',
  'uuid_generate_v1' LANGUAGE c VOLATILE STRICT COST 1;
ALTER FUNCTION "public"."uuid_generate_v1"() OWNER TO "postgres";
-- ----------------------------
-- Function structure for uuid_generate_v1mc
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1mc"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v1mc"() RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp',
  'uuid_generate_v1mc' LANGUAGE c VOLATILE STRICT COST 1;
ALTER FUNCTION "public"."uuid_generate_v1mc"() OWNER TO "postgres";
-- ----------------------------
-- Function structure for uuid_generate_v3
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v3"("namespace" uuid, "name" text);
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v3"("namespace" uuid, "name" text) RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp',
  'uuid_generate_v3' LANGUAGE c IMMUTABLE STRICT COST 1;
ALTER FUNCTION "public"."uuid_generate_v3"("namespace" uuid, "name" text) OWNER TO "postgres";
-- ----------------------------
-- Function structure for uuid_generate_v4
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v4"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v4"() RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp',
  'uuid_generate_v4' LANGUAGE c VOLATILE STRICT COST 1;
ALTER FUNCTION "public"."uuid_generate_v4"() OWNER TO "postgres";
-- ----------------------------
-- Function structure for uuid_generate_v5
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v5"("namespace" uuid, "name" text);
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v5"("namespace" uuid, "name" text) RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp',
  'uuid_generate_v5' LANGUAGE c IMMUTABLE STRICT COST 1;
ALTER FUNCTION "public"."uuid_generate_v5"("namespace" uuid, "name" text) OWNER TO "postgres";
-- ----------------------------
-- Function structure for uuid_nil
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_nil"();
CREATE OR REPLACE FUNCTION "public"."uuid_nil"() RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp',
  'uuid_nil' LANGUAGE c IMMUTABLE STRICT COST 1;
ALTER FUNCTION "public"."uuid_nil"() OWNER TO "postgres";
-- ----------------------------
-- Function structure for uuid_ns_dns
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_dns"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_dns"() RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp',
  'uuid_ns_dns' LANGUAGE c IMMUTABLE STRICT COST 1;
ALTER FUNCTION "public"."uuid_ns_dns"() OWNER TO "postgres";
-- ----------------------------
-- Function structure for uuid_ns_oid
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_oid"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_oid"() RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp',
  'uuid_ns_oid' LANGUAGE c IMMUTABLE STRICT COST 1;
ALTER FUNCTION "public"."uuid_ns_oid"() OWNER TO "postgres";
-- ----------------------------
-- Function structure for uuid_ns_url
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_url"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_url"() RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp',
  'uuid_ns_url' LANGUAGE c IMMUTABLE STRICT COST 1;
ALTER FUNCTION "public"."uuid_ns_url"() OWNER TO "postgres";
-- ----------------------------
-- Function structure for uuid_ns_x500
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_x500"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_x500"() RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp',
  'uuid_ns_x500' LANGUAGE c IMMUTABLE STRICT COST 1;
ALTER FUNCTION "public"."uuid_ns_x500"() OWNER TO "postgres";
-- ----------------------------
-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS "public"."banner";
CREATE TABLE "public"."banner" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "image" text COLLATE "pg_catalog"."default",
  "sort_order" int2 DEFAULT 0,
  "created_at" timestamptz(6),
  "created_by" uuid,
  "updated_at" timestamptz(6),
  "updated_by" uuid
);
ALTER TABLE "public"."banner" OWNER TO "postgres";
-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS "public"."cart";
CREATE TABLE "public"."cart" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "created_at" timestamptz(6),
  "created_by" uuid,
  "updated_at" timestamptz(6),
  "updated_by" uuid,
  "status_id" uuid,
  "cart_price" numeric(10, 0)
);
ALTER TABLE "public"."cart" OWNER TO "postgres";
-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS "public"."category";
CREATE TABLE "public"."category" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "image" varchar(255) COLLATE "pg_catalog"."default",
  "parent_id" uuid,
  "created_at" timestamptz(6),
  "created_by" uuid,
  "updated_at" timestamptz(6),
  "updated_by" uuid
);
ALTER TABLE "public"."category" OWNER TO "postgres";
-- ----------------------------
-- Table structure for connect
-- ----------------------------
DROP TABLE IF EXISTS "public"."connect";
CREATE TABLE "public"."connect" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "product_id" uuid,
  "feedback_id" uuid,
  "cart_id" uuid,
  "amount" int4 DEFAULT 1,
  "category_id" uuid
);
ALTER TABLE "public"."connect" OWNER TO "postgres";
-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS "public"."feedback";
CREATE TABLE "public"."feedback" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "content" text COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6),
  "created_by" uuid,
  "updated_at" timestamptz(6),
  "updated_by" uuid,
  "rating" numeric(10, 1),
  "username" text COLLATE "pg_catalog"."default"
);
ALTER TABLE "public"."feedback" OWNER TO "postgres";
-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS "public"."product";
CREATE TABLE "public"."product" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "origin_price" numeric(10, 3),
  "discount_price" numeric(10, 3) DEFAULT 0,
  "rating" int2,
  "image" varchar [] COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "detail" varchar COLLATE "pg_catalog"."default",
  "sku" varchar(255) COLLATE "pg_catalog"."default",
  "attributes" json,
  "created_at" timestamptz(6),
  "created_by" uuid,
  "updated_at" timestamptz(6),
  "updated_by" uuid,
  "sold" int4 DEFAULT 0,
  "is_active" bool DEFAULT true,
  "display" bool DEFAULT false,
  "type" varchar(10) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'PRODUCT'::character varying,
  "discount_percent" numeric(10, 0),
  "region" varchar(255) COLLATE "pg_catalog"."default",
  "meta" text COLLATE "pg_catalog"."default"
);
ALTER TABLE "public"."product" OWNER TO "postgres";
COMMENT ON COLUMN "public"."product"."type" IS 'PRODUCT | COURSE | SERVICE';
COMMENT ON COLUMN "public"."product"."region" IS 'ASIA | OCE | EU | US | LATAM | AFRICA';
-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS "public"."status";
CREATE TABLE "public"."status" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "code" varchar(255) COLLATE "pg_catalog"."default",
  "group_code" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default"
);
ALTER TABLE "public"."status" OWNER TO "postgres";
-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "email" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "full_name" varchar COLLATE "pg_catalog"."default",
  "password" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamptz(6),
  "created_by" uuid,
  "updated_at" timestamptz(6),
  "updated_by" uuid,
  "avatar" varchar(255) COLLATE "pg_catalog"."default"
);
ALTER TABLE "public"."user" OWNER TO "postgres";
-- ----------------------------
-- Function structure for updated_cart_price
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."updated_cart_price"();
CREATE OR REPLACE FUNCTION "public"."updated_cart_price"() RETURNS "pg_catalog"."trigger" AS $BODY$ BEGIN -- Routine body goes here...
  IF NEW.cart_id IS NOT NULL THEN WITH cte as (
    SELECT discount_price * "connect".amount as price
    FROM product
      INNER JOIN "connect" ON product.id = "connect".product_id
    WHERE "connect".cart_id = NEW.cart_id
  )
UPDATE cart
SET cart_price = (
    SELECT sum(price)
    from cte
  );
END IF;
RETURN NEW;
END;
$BODY$ LANGUAGE plpgsql VOLATILE COST 100;
ALTER FUNCTION "public"."updated_cart_price"() OWNER TO "postgres";
-- Primary Key structure for table banner
-- ----------------------------
ALTER TABLE "public"."banner"
ADD CONSTRAINT "banner_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Primary Key structure for table cart
-- ----------------------------
ALTER TABLE "public"."cart"
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Primary Key structure for table category
-- ----------------------------
ALTER TABLE "public"."category"
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Triggers structure for table connect
-- ----------------------------
CREATE TRIGGER "updateCartPrice" BEFORE
INSERT
  OR
UPDATE ON "public"."connect" FOR EACH ROW EXECUTE PROCEDURE "public"."updated_cart_price"();
-- ----------------------------
-- Primary Key structure for table connect
-- ----------------------------
ALTER TABLE "public"."connect"
ADD CONSTRAINT "connect_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Primary Key structure for table feedback
-- ----------------------------
ALTER TABLE "public"."feedback"
ADD CONSTRAINT "feedback_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Primary Key structure for table product
-- ----------------------------
ALTER TABLE "public"."product"
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Primary Key structure for table status
-- ----------------------------
ALTER TABLE "public"."status"
ADD CONSTRAINT "status_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user"
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Foreign Keys structure for table banner
-- ----------------------------
ALTER TABLE "public"."banner"
ADD CONSTRAINT "banner_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."banner"
ADD CONSTRAINT "banner_fk_1" FOREIGN KEY ("updated_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ----------------------------
-- Foreign Keys structure for table cart
-- ----------------------------
ALTER TABLE "public"."cart"
ADD CONSTRAINT "fk_cart_table_1_1" FOREIGN KEY ("status_id") REFERENCES "public"."status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."cart"
ADD CONSTRAINT "fk_cart_user_1" FOREIGN KEY ("created_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."cart"
ADD CONSTRAINT "fk_cart_user_2" FOREIGN KEY ("updated_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ----------------------------
-- Foreign Keys structure for table category
-- ----------------------------
ALTER TABLE "public"."category"
ADD CONSTRAINT "fk_category_category_1" FOREIGN KEY ("parent_id") REFERENCES "public"."category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."category"
ADD CONSTRAINT "fk_category_user_1" FOREIGN KEY ("created_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."category"
ADD CONSTRAINT "fk_category_user_2" FOREIGN KEY ("created_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ----------------------------
-- Foreign Keys structure for table connect
-- ----------------------------
ALTER TABLE "public"."connect"
ADD CONSTRAINT "fk_connect_cart_1" FOREIGN KEY ("cart_id") REFERENCES "public"."cart" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."connect"
ADD CONSTRAINT "fk_connect_category_1" FOREIGN KEY ("category_id") REFERENCES "public"."category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."connect"
ADD CONSTRAINT "fk_connect_feedback_1" FOREIGN KEY ("feedback_id") REFERENCES "public"."feedback" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."connect"
ADD CONSTRAINT "fk_connect_product_1" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ----------------------------
-- Foreign Keys structure for table feedback
-- ----------------------------
ALTER TABLE "public"."feedback"
ADD CONSTRAINT "fk_feedback_user_1" FOREIGN KEY ("created_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."feedback"
ADD CONSTRAINT "fk_feedback_user_2" FOREIGN KEY ("updated_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ----------------------------
-- Foreign Keys structure for table product
-- ----------------------------
ALTER TABLE "public"."product"
ADD CONSTRAINT "fk_product_user_1" FOREIGN KEY ("created_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product"
ADD CONSTRAINT "fk_product_user_2" FOREIGN KEY ("updated_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ----------------------------
-- Foreign Keys structure for table user
-- ----------------------------
ALTER TABLE "public"."user"
ADD CONSTRAINT "fk_user_user_1" FOREIGN KEY ("created_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."user"
ADD CONSTRAINT "fk_user_user_2" FOREIGN KEY ("updated_by") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;