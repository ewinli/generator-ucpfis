package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class IndexController extends Controller {

    public static void index() {
        renderTemplate("index/index.html");
    }

}