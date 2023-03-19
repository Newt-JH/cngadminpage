DROP PROCEDURE IF EXISTS cngTech.SelectProductStatus;
/*
    CALL cngTech.SelectProductStatus();
*/
DELIMITER //
CREATE PROCEDURE cngTech.SelectProductStatus (
)
BEGIN

    select * from cngTech.ProductStatus;

END //
DELIMITER ;