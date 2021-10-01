# Backend Assignment @Retail Pulse

### Description
This is a backend assignment made by Vivek Kamboj for the Retail pulse. I have implemented this assignment in node.js, with express as a framework. The problem statement is given below:

Retail Pulse wants to create a service to process thousands of images collected from stores.

1. The service receives the jobs with image URLs and store id.  
There can be multiple jobs with thousands of images each at a given time, and a job can take few minutes to an hour to complete. Using the above API, a user submits the job.
    
2. To process a job, the service downloads the images and calculates the perimeter `2* [Height+Width]` of each image. After calculating the perimeter of the image, you need to have a **random sleep time of 0.1 to 0.4 secs** (this is to imitate GPU processing). After this, we store the results at an image level.
3. Refer [Store Master] for the `store_id`, `store_name` and `area_code`
4. Once the job is created, [Get Job Info] API can check its status.

### Assumption:
- [x] I have assumed that schema for the store is made before, OK, and I have only implemented job schema.
- [x] I also have assumed that the image URLs are correct and do not include any check for them.

### Installation:

- [x]  Make a `.env` file with (‘MONGODB_URI=`<Your MongoDB URI>`’)
- [x] Run `npm install` (to install dependencies)
- [x] Run `npm start` (to test the application)



## APIs:
#### Submit Job
	URL: /api/submit/
	Method: POST

- Success Response

  - Condition: If everything is OK, and a job is created.
  - Status Code: 201 CREATED
  - ScreenShot:
    ![demo](https://user-images.githubusercontent.com/43985107/135622074-8a555e00-220f-4534-ab03-d0b0b967b696.jpg)
- Error Responses
  - Condition: If fields are missing OR count != len(visits)
  - Code: 400 BAD REQUEST
  - ScreenShot:
    ![demo](https://user-images.githubusercontent.com/43985107/135622569-b644482b-8693-42bf-93af-b23d876f969b.jpg)

#### Get Job Info
  URL : /api/status?jobid=123
  URL Parameters: -’jobid’ - Job ID received while creating the job
  Method: GET
- Success Response
  - Condition: If everything is ok and jobID exists.
  - Code: 200 OK
  - ScreenShot:

    - job status: completed
      - ![demo](https://user-images.githubusercontent.com/43985107/135622945-636c9d33-7cac-4870-b740-a30a14b708e5.jpg)
    - job status: ongoing
      - ![demo](https://user-images.githubusercontent.com/43985107/135623089-c55ecc43-f228-4feb-b533-4b1060453239.jpg)
    - job status: failed
      -  ![demo](https://user-images.githubusercontent.com/43985107/135623224-be2165a7-cabb-4f4b-ad0a-053161edf344.jpg)

- Error Responses
  - Condition: If jobID does not exist
  - Code: 400 BAD REQUEST
    - ![demo](https://user-images.githubusercontent.com/43985107/135623374-091fdbee-3519-49c6-93b4-982146272e92.jpg)

### Assignment Link:
https://www.notion.so/retailpulse/Backend-Assignment-529d5850691d483db61c3561cfaa7293






    
