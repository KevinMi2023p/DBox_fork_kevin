import React from 'react';
import {render} from 'react-dom';
import {WelcomeUser} from './welcome_user';
import {UserS3} from './aws_s3_connect';
import {AuthS3} from './aws_s3_auth';
import {ConfigureBucket} from './aws_s3_config_bucket';
import {FileTransfer} from './aws_s3_file_transfer';
import {ViewStateStorage} from './storage/store_view_state';
import {UserMetaStorage} from './storage/store_user_metadata';

// Type Props specifies a function that will change the state of App
type Props = {
    onViewChange? : (s:string)=>void,
    onS3ObjChange? : (o:UserS3)=>void
};

// Type ViewState specifies the state (auth, bucket configuration, file upload display, etc)
type State = {
    view: string;
    s3Obj: UserS3 | null;
}

// App will serve as the root node for the "tree" of different UIs. It will always render the "state" that is set by any sub function  
export class App extends React.Component<Props, State>{

    // Create the App, set props and default the state of App to render auth
    constructor(props:Props) {
        super(props);
        this.setViewState = this.setViewState.bind(this);
        this.setS3Obj = this.setS3Obj.bind(this);
        this.state = {
            view: 'welcome',
            s3Obj: null
        };

        // "Reconstruct" the App object if necessary
        ViewStateStorage.getViewState(this.updateViewStatefromStorage);
        UserMetaStorage.getUserS3Obj(this.updateS3ObjFromStorage);
    }

    // Function that will be passed as a prop to update the state of the UI
    setViewState(view:string) {
        this.setState({view});
        // Update state in chrome storage 
        ViewStateStorage.putViewState(view);
    }

    // Function that will be passed as prop to globalize the S3 Object being made
    setS3Obj(s3Obj:UserS3 | null){

        this.setState({s3Obj});

        // Change the user metadata only if the s3 object is not null
        if (s3Obj){
            UserMetaStorage.putUserS3Obj(s3Obj!);
        }
    }

    // Changes the view state from what is in storage
    updateViewStatefromStorage = (view:string) => {
        if (view === 'welcome' || view === 'auth' || view === 'config-bucket' || view === 'file-transfer'){
            this.setViewState(view);
        } else {
            console.error("Trying to swtich to a UI view state that doesn't exist")
        }
    }

    // Updates the s3 object from what is in storage
    updateS3ObjFromStorage = (accessKeyId:string, secretAccessKey:string, region:string, bucket:string) => {

        // Access keys could be undefined if chrome storage returns undefined for a key that doesn't exist
        if (accessKeyId !== undefined && secretAccessKey !== undefined && region !== undefined && bucket !== undefined){

            const s3Obj = new UserS3(accessKeyId, secretAccessKey, region);
            s3Obj.changeBucket(bucket);
            
            this.setS3Obj(s3Obj); 
        }
    }

    // Logout function should move into configure bucket and send file classes. Contained in App for now
    logout = () => {
        
        const viewCallback = () => {
            this.setViewState('welcome');
        }

        const userCallback = () => {
            this.setS3Obj(null);
        }

        ViewStateStorage.removeViewState(viewCallback);
        UserMetaStorage.removeUserMeta(userCallback);
    }

    render() {
        return (
        <div>
            {this.state.view === 'welcome' 
            &&
            <WelcomeUser
                onViewChange={this.setViewState}
            />}

            {this.state.view === 'auth' 
            &&
            <AuthS3
                onViewChange={this.setViewState}
                onS3ObjChange = {this.setS3Obj}
            />}
            
            {this.state.view === 'config-bucket' 
            && 
            <div>
                <ConfigureBucket
                    onS3ObjChange={this.setS3Obj}
                    onViewChange={this.setViewState}
                    existingS3Obj={this.state.s3Obj!}
                />
                <div id="logout">
                    <button
                        id="logoutButton"
                        type="button" 
                        value="Logout"
                        onClick={this.logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            }

            {this.state.view === 'file-transfer'
            &&
            <div>
                <FileTransfer
                    onS3ObjChange={this.setS3Obj}
                    onViewChange={this.setViewState}
                    existingS3Obj={this.state.s3Obj!}
                />                
                <div id="logout">
                    <button
                        id="logoutButton"
                        type="button" 
                        value="Logout"
                        onClick={this.logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            }
        </div>
        )
    }
}

render(<App/>, document.getElementById("root"));