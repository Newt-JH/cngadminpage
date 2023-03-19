DROP PROCEDURE IF EXISTS cngTech.UpdateProductStatus;
/*
    CALL cngTech.UpdateProductStatus(1,3,1);
*/
DELIMITER //
CREATE PROCEDURE cngTech.UpdateProductStatus (
    IN _releaseCount Integer,
    IN _usedCount Integer,
    IN _rentalCount Integer
)
BEGIN

    UPDATE cngTech.ProductStatus
        SET
            releaseCount = _releaseCount,
            usedCount = _usedCount,
            rentalCount = _rentalCount
    WHERE 1 = 1;

END //
DELIMITER ;