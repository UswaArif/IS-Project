function getbal() {
    var balance = 10000; 
    document.getElementById('my_bal').textContent = balance;
    //console.log("uswa")
    //console.log(document.getElementById('reciever_accno'));

}

function get_sender() {
    var receiverAccNo = document.transfer.reciever_accno.value;

    var usersCollection = firebase.firestore().collection("Users");

    usersCollection.where("acc_no", "==", receiverAccNo).get().then(function(querySnapshot) {
        if (!querySnapshot.empty) {
            // Data exists, update receiver name
            var receiverName = querySnapshot.docs[0].data().name;
            document.getElementById('f_name').textContent = receiverName;
        } else {
            // No data found, display message
            document.getElementById('f_name').textContent = "No Account exists";
        }
    }).catch(function(error) {
        // Log any errors
        console.log('Error fetching receiver name: ', error);
    });
}

// Function to show the receiver's name
function showReceiverName() {
    var receiverAccNo = document.getElementById("receiver_accno").value;

    var usersCollection = firebase.firestore().collection("Users");

    // Query for documents where the 'acc_no' field matches receiver account number
    usersCollection.where("acc_no", "==", receiverAccNo).get().then(function(querySnapshot) {
        if (!querySnapshot.empty) {
            // Data exists, update receiver name
            var receiverName = querySnapshot.docs[0].data().name;
            document.getElementById('receiver_name').textContent = receiverName;
        } else {
            // No data found, display message
            document.getElementById('receiver_name').textContent = "No Account exists";
        }
    }).catch(function(error) {
        // Log any errors
        console.log('Error fetching receiver name: ', error);
    });
}

// Function to encode data into an image using steganography
function encodeDataIntoImage(imageFile, data) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function(e) {
            var image = new Image();
            image.onload = function() {
                try {
                    var stegImage = steg.encode(image, data);
                    resolve(stegImage);
                } catch (error) {
                    reject(error);
                }
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
    });
}


async function submit_form() {
    var receiverAccNo = document.transfer.reciever_accno.value;
    var transferAmount = document.transfer.transfer_amount.value;
    var imageFile = document.transfer.image.files[0];

    try {
        // Encode data into the image
        var steganographedImage = await encodeDataIntoImage(imageFile, `${receiverAccNo}:${transferAmount}`);

        // Once steganography is done, proceed with form submission
        if (steganographedImage) {
            // Create a FormData object to store form data
            var formData = new FormData();
            formData.append('receiverAccNo', receiverAccNo);
            formData.append('transferAmount', transferAmount);
            formData.append('image', steganographedImage);

            // Send form data to the server using AJAX or fetch API
            // For demonstration, let's assume we use fetch API
            fetch('submit_form_endpoint', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Handle response
                console.log('Form submitted successfully');
                // Optionally, you can check the response status and display a message accordingly
                if (response.ok) {
                    // Display success message
                    document.getElementById('success_message').textContent = 'Transfer successful!';
                } else {
                    // Display error message
                    document.getElementById('success_message').textContent = 'Transfer failed. Please try again later.';
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                // Handle error
                // Display error message
                document.getElementById('success_message').textContent = 'Transfer failed. Please try again later.';
            });
        } else {
            // If steganography fails, show an error message
            console.error('Steganography failed');
            // Display error message
            document.getElementById('success_message').textContent = 'Transfer failed. Please try again later.';
        }
    } catch (error) {
        console.error('Error encoding data into image:', error);
        // Handle error
        // Display error message
        document.getElementById('success_message').textContent = 'Transfer failed. Please try again later.';
    }

    // Return false to prevent form submission
    return false;
}

function somefunction()
{
    var receiverAccNo = document.transfer.reciever_accno.value;
    console.log(receiverAccNo)
    var usersCollection = firebase.firestore().collection("Users");

    usersCollection.where("acc_no", "==", receiverAccNo).get().then(function(querySnapshot) {
        if (!querySnapshot.empty) {
            // Data exists, update receiver name
            var receiverName = querySnapshot.docs[0].data().name;
            document.getElementById('f_name').textContent = receiverName;
        } else {
            // No data found, display message
            document.getElementById('f_name').textContent = "No Account exists";
        }
    }).catch(function(error) {
        // Log any errors
        console.log('Error fetching receiver name: ', error);
    });
}