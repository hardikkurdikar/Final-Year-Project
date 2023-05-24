import cv2
import numpy as np


image = cv2.imread('C:\\Users\\acer\\Desktop\\acne.jpg')


kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])


sharpened = cv2.filter2D(image, -1, kernel)

cv2.imwrite('C:\\Users\\acer\\Desktop\\sharpened.jpg', sharpened)