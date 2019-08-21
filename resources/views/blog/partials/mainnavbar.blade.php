<nav class="navbar navbar-expand-lg bg-success">
        <div class="container">
            <div class="navbar-translate">
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" 
                    data-target="#navbar-menu" aria-controls="navbarSupportedContent" aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    <span class="navbar-toggler-icon"></span>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a href="/" class="navbar-brand">Spoor</a>
            </div>
            <div class="collapse navbar-collapse" id="navbar-menu">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a href="/blog" class="nav-link">
                            <i class="fa fa-th"></i>
                            Blog
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/incidents" class="nav-link"><i class="fa fa-map-marker"></i>
                            Incidents</a>                         
                    </li>
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" 
                            href="#pk" role="button" aria-haspopup="true" 
                            aria-expanded="false">
                            <i class="fa fa-file-text"></i>
                            Resources
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <!--<li class="dropdown-header">Dropdown header</li>-->
                            <a href="/resources" class="dropdown-item">Downloads</a>
                        </ul>
                    </div>
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" 
                            href="#pk" role="button" aria-haspopup="true" 
                            aria-expanded="false">
                            <i class="fa fa-exclamation-triangle"></i>
                            Get Involved
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <!--<li class="dropdown-header">Dropdown header</li>-->
                            <a href="/be-a-member" class="dropdown-item">Be a Member</a>
                        </ul>
                    </div>
                    <li class="nav-item">
                        <a href="/member" class="nav-link"><i class="fa fa-users"></i>
                            Members</a>
                    </li>
                    <li class="nav-item">
                        <a href="/contact" class="nav-link">
                            <i class="fa fa-address-book"></i>
                            Contact
                        </a>
                    </li>
                    <div v-if="user.name" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" 
                            href="#pk" role="button" aria-haspopup="true" 
                            aria-expanded="false">
                            <i class="fa fa-user-circle-o"></i>
                            {{ $data['user']->name }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <!--<li class="dropdown-header">Dropdown header</li>-->
                            <a href="/admin" class="dropdown-item">Admin</a>
                            <a href="/incidentTypes" class="dropdown-item">Incident Types</a>
                            <div class="dropdown-divider"></div>
                            {{-- onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();" --}}
                            <a class="dropdown-item">
                                Logout
                            </a>
                            <form id="logout-form" :action="'/logout'" 
                                    method="POST" style="display: none;">
                                <input type="hidden" name="_token" id="csrf-token" :value="csrf_token" />
                            </form>
                        </ul>
                    </div>
                    <li v-else class="nav-item">
                        <a class="nav-link" href="/login">
                            <i class="fa fa-user-circle-o"></i>
                            Login
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <hr/>
    </nav>