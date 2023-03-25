DROP PROCEDURE IF EXISTS cngTech.SearchProductList;
/*
    CALL cngTech.SearchProductList('2023-01-01','2024-01-01',null,1);
*/
DELIMITER //
CREATE PROCEDURE cngTech.SearchProductList (
    IN _createDateTime date,
    IN _updateDateTime date,
    IN _seachText varchar(50),
    IN _offset tinyint
)
BEGIN

    DECLARE offset_val INT;
    SET offset_val = (_offset - 1) * 4;

    IF _seachText = '' THEN
        SELECT * FROM cngTech.Product pd
        where createDateTime between _createDateTime and _updateDateTime
        ORDER BY pd.productID DESC LIMIT 4 OFFSET offset_val;
    ELSE
        SELECT * FROM cngTech.Product pd
        where createDateTime between _createDateTime and _updateDateTime
        and name like CONCAT('%',_seachText,+'%')
        ORDER BY pd.productID DESC LIMIT 4 OFFSET offset_val;
    END IF;

END //
DELIMITER ;