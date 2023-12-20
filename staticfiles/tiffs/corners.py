#!/usr/bin/env python3.9


import gdal

def get_corners(tif_file):
    dataset = gdal.Open(tif_file)
    if not dataset:
        raise Exception("Failed to open the TIF file.")

    geo_transform = dataset.GetGeoTransform()
    ulx, x_res, x_rot, uly, y_rot, y_res = geo_transform
    lrx = ulx + (dataset.RasterXSize * x_res)
    lry = uly + (dataset.RasterYSize * y_res)

    corners = [
        [ulx, uly],
        [lrx, uly],
        [lrx, lry],
        [ulx, lry]
    ]

    return corners

tif_file = "path/to/your/tif.tif"
corners = get_corners(tif_file)

for corner in corners:
    print(f"[{corner[0]:.3f}, {corner[1]:.3f}],")