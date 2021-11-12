import React from 'react';
import './styleDrag.css';

export const draggableUploader = () =>{
    return (
            <div class="file-upload">
            <h2>Image Drag & Drop & Preview</h2>
                <form class="">
                    <div class="custom-form-group">
                        <div class="custom-file-drop-area">
                            <input type="file"name="photos" placeholder="Enter photos" multiple="true" id="filephotos"/>
                            <label for="filephotos">Drag & Drop</label>
                        </div>
                        <div class="custom-file-preview">
                            <div class="prev-img">
                                <span>&times;</span>
                                <img src="https://picsum.photos/id/237/200/300" alt="asd"/>
                            </div>
                            <div class="prev-img">
                                <span>&times;</span>
                                <img src="https://picsum.photos/id/237/200/300" alt="asd"/>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn-submit">Submit</button>
                </form>
            </div>
    )
}
