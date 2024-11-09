/** Show error messages
 *
 * Props:
 * - Message: can look like: "Invalid username/password"
 *
 * App -> LoginForm -> Errors
 *
 * or
 *
 * App -> SignUpForm -> Errors
*/
function Errors({ messages }:{messages:String[]}) {
    return (
        <div className="Alert">
            {messages.map(m => <p>{m}</p>)}

        </div>
    );
}

export default Errors;
