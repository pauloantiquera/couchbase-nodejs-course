#Couchbase + NodeJS + Express Course Lab App

##Lab 1​ - Install Couchbase, load bucket, create primary index, and install Postman (Using docker image)

  1. Install and configure Couchbase Server 4.5+ as a single node (Docker image)
  2. Survey the Couchbase administration console 
  3. Create a bucket and load documents into Couchbase using cbdocloader 
  4. Create a primary index to support ad hoc queries (CREATE PRIMARY INDEX) 
  5. Install Postman to test REST API URLs

##Lab 2 - Connect to Cluster, open password protected Bucket, get JSON document, object, and values

  1. Install the couchbase module, and configure an application to use it
  2. Create a cluster reference, open a Bucket, and get a document by document ID
  3. Display the result of a get operation, and close the bucket connection
  4. Configure a Bucket password, and use it when opening the Bucket

##Lab 3 - ​ Getting, modifying, and deleting documents using SDK operations through a REST API
 
  1. Get a document in response to a GET request
  2. Insert a new document in response to a POST request
  3. Compare insert and upsert operations
  4. Replace a document in response to a PUT request
  5. Delete a document in response to a DELETE request

##Lab 4 - SELECT, INSERT, UPDATE, and DELETE in response to REST requests

  1. SELECT specific document by document ID in GET operation 
  2. SELECT documents matching specified value in GET operation 
  3. INSERT new document in POST operation 
  4. UPDATE existing document in PUT operation 
  5. DELETE existing document in DELETE operation

##Lab 5 - Build Ottoman models and use to import data
  
  1. Install Ottoman framework and review files 
  2. Open bucket and assign instance to Ottoman framework 
  3. Create Ottoman models including read­only and referenced attributes 
  4. Create and load new data bucket using Ottoman models
  