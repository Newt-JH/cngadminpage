DROP PROCEDURE IF EXISTS cngTech.SelectProductList;
/*
    CALL cngTech.SelectProductList(1);
*/
DELIMITER //
CREATE PROCEDURE cngTech.SelectProductList (
    IN _offset tinyint
)
BEGIN

    DECLARE offset_val INT;
    SET offset_val = (_offset - 1) * 4;

    SELECT * FROM cngTech.Product pd ORDER BY pd.productID DESC LIMIT 4 OFFSET offset_val;


END //
DELIMITER ;