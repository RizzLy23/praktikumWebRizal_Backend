-- CreateTable
CREATE TABLE `gaminggear` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `price` INTEGER NULL,
    `qty` INTEGER NULL,

    UNIQUE INDEX `gaminggear_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
