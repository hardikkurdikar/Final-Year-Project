import cv2

img = cv2.imread('C:\\Users\\acer\\Desktop\\acne.jpg', 0)

cv2.imshow('Grayscale Image', img)

cv2.waitKey(0)

cv2.destroyAllWindows()


