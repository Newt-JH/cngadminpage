DROP PROCEDURE IF EXISTS cngTech.DeleteProductList;
/*
    CALL cngTech.DeleteProductList("5,6");
*/
DELIMITER //
CREATE PROCEDURE cngTech.DeleteProductList (
    IN rowIds TEXT
)
BEGIN

    SET @sql = CONCAT('delete from cngTech.Product where productID in (', rowIds, ')');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

        END //
DELIMITER ;