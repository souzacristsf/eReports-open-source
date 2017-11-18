-- DROP TABLE product;
-- DROP TABLE employee;
-- DROP TABLE purchase;
CREATE TABLE product
   ( 
        product_id NUMBER CONSTRAINT product_id_nn NOT NULL 
        , name VARCHAR2(50) NOT NULL
        , value NUMBER(10,2) NOT NULL
   );
CREATE UNIQUE INDEX pro_id_pk ON product (product_id);
ALTER TABLE product ADD ( CONSTRAINT pro_id_pk PRIMARY KEY (product_id) ) ;

CREATE TABLE employee 
   ( employee_id NUMBER CONSTRAINT employee_id_nn NOT NULL 
   , name VARCHAR2(40) 
   );
CREATE UNIQUE INDEX empl_id_pk ON employee (employee_id);
ALTER TABLE employee ADD ( CONSTRAINT empl_id_pk PRIMARY KEY (employee_id) ) ;

CREATE TABLE purchase 
   ( purchase_id CHAR(2) CONSTRAINT purchase_id_nn NOT NULL 
   , qtd NUMBER NOT NULL
   , employee_id NUMBER
   , product_id NUMBER
   , order_date DATE
   );
ALTER TABLE purchase
    ADD ( CONSTRAINT purc_empl_prod_fk PRIMARY KEY (purchase_id),
          CONSTRAINT purc_empl_fk FOREIGN KEY (employee_id) REFERENCES employee,
          CONSTRAINT purc_prod_fk FOREIGN KEY (product_id) REFERENCES product
    ) ;

COMMIT;

ALTER SESSION SET NLS_LANGUAGE='BRAZILIAN PORTUGUESE';

--insert data in product 
INSERT INTO product VALUES
    (
      1
    , 'Calca Jeans'
    , 99.99
    );
INSERT INTO product VALUES
    (
      2
    , 'Saia Jeans'
    , 90.50
    );

INSERT INTO product VALUES
    (
      3
    , 'Meia Feminina'
    , 6.90
    );

INSERT INTO product VALUES
    (
      4
    , 'Meia Masculina'
    , 10.90
    );

INSERT INTO product VALUES
    (
      5
    , 'Sapatos Masculina'
    , 150.99
    );

INSERT INTO product VALUES
    (
      6
    , 'Sapatos Feminina'
    , 450.99
    );    

--insert data in employee 
INSERT INTO employee VALUES
    (
      1
    , 'Michel Ferreira Souza'
    ); 

INSERT INTO employee VALUES
    (
      2
    , 'Dilma Rousseff'
    ); 

INSERT INTO employee VALUES
    (
      3
    , 'Lula Molusco'
    ); 

INSERT INTO employee VALUES
    (
      4
    , 'Michel Temer'
    ); 

INSERT INTO employee VALUES
    (
      5
    , 'Inacio Lula da Silva'
    ); 

-- insert table purchase
INSERT INTO purchase VALUES
    (
      1
    , 25
    , 1
    , 1
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      2
    , 10
    , 2
    , 2
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      3
    , 5
    , 3
    , 3
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      4
    , 9
    , 4
    , 3
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      5
    , 28
    , 5
    , 2
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      12
    , 600
    , 5
    , 6
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      6
    , 13
    , 1
    , 2
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      7
    , 2
    , 2
    , 6
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      8
    , 35
    , 3
    , 4
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      9
    , 70
    , 4
    , 5
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      10
    , 180
    , 5
    , 1
    , sysdate 
    );

INSERT INTO purchase VALUES
    (
      11
    , 900
    , 5
    , 5
    , sysdate 
    );

COMMIT;



