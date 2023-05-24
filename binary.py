import cv2

img = cv2.imread('C:\\Users\\acer\\Desktop\\acne.jpg', 2)

ret, bw_img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)

bw = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)

cv2.imshow("Binary", bw_img)
cv2.waitKey(0)
cv2.destroyAllWindows()